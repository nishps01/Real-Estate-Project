const Booking = require("../models/Booking");
const mail = require("../services/emailService");
exports.create = async (req, res, next) => {
  try {
    const b = await Booking.create({ ...req.body, status: "PENDING" });
    await mail.bookingRequestMail(b.email, b.name, b.propertyTitle);
    res.status(201).json(b);
  } catch (e) {
    next(e);
  }
};
exports.userBookings = async (req, res, next) => {
  try {
    res.json(
      await Booking.find({ email: req.params.email }).sort({ createdAt: -1 }),
    );
  } catch (e) {
    next(e);
  }
};
exports.cancel = async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled" });
  } catch (e) {
    next(e);
  }
};
exports.all = async (req, res, next) => {
  try {
    res.json(await Booking.find().sort({ createdAt: -1 }));
  } catch (e) {
    next(e);
  }
};
exports.remove = async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
exports.updateStatus = async (req, res, next) => {
  try {
    const status = (req.query.status || req.body.status || "").toUpperCase();
    if (!["PENDING", "APPROVED", "REJECTED"].includes(status))
      return res.status(400).json({ message: "Invalid status" });
    const b = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!b) return res.status(404).json({ message: "Booking not found" });
    if (status === "REJECTED")
      await mail.bookingRejectedMail(b.email, b.name, b.propertyTitle);
    if (status === "APPROVED")
      await mail.bookingConfirmedMail(b.email, b.name, b.propertyTitle);
    res.json(b);
  } catch (e) {
    next(e);
  }
};
