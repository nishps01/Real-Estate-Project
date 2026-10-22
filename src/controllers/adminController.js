const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const User = require("../models/User");
const Booking = require("../models/Booking");
const { generateToken } = require("../utils/jwt");
exports.create = async (req, res, next) => {
  try {
    if (await Admin.exists({ email: req.body.email }))
      return res
        .status(409)
        .json({ message: "Admin with this email already exists" });
    const a = await Admin.create({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      verified: true,
    });
    res.status(201).json({ id: a.id, email: a.email, verified: a.verified });
  } catch (e) {
    next(e);
  }
};
exports.login = async (req, res, next) => {
  try {
    const a = await Admin.findOne({ email: req.body.email });
    if (!a || !(await bcrypt.compare(req.body.password, a.password)))
      return res.status(401).json({ message: "Invalid credentials" });
    if (!a.verified)
      return res.status(403).json({ message: "Admin not verified" });
    res.json({
      accessToken: generateToken(a.id, a.email, "ADMIN"),
      refreshToken: null,
      role: "ADMIN",
    });
  } catch (e) {
    next(e);
  }
};
exports.update = async (req, res, next) => {
  try {
    const data = {};
    if (req.body.email) data.email = req.body.email;
    if (req.body.password)
      data.password = await bcrypt.hash(req.body.password, 10);
    const a = await Admin.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!a) return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Admin updated successfully" });
  } catch (e) {
    next(e);
  }
};
exports.users = async (req, res, next) => {
  try {
    res.json(await User.find().select("-password -refreshToken"));
  } catch (e) {
    next(e);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
exports.approve = async (req, res, next) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: "APPROVED" });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
exports.reject = async (req, res, next) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: "REJECTED" });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
