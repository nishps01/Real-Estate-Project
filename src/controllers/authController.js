const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Otp = require("../models/Otp");
const { generateToken } = require("../utils/jwt");
const mail = require("../services/emailService");



exports.sendOtp = async (req, res, next) => {
  try {
    const email = req.body.to || req.body.email;
    const phone = req.body.phone;
    if (!email && !phone)
      return res.status(400).json({ message: "Email or phone required" });
    let user = email
      ? await User.findOne({ email })
      : await User.findOne({ phone });
    if (!user)
      user = await User.create({ email, phone, role: "USER", active: true });
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    await Otp.findOneAndUpdate(
      { email },
      { email, phone, otp, expiryTime: new Date(Date.now() + 5 * 60 * 1000) },
      { upsert: true, new: true },
    );
    if (email) await mail.sendOtp(email, otp);
    res.json({ message: "OTP sent successfully" });
  } catch (e) {
    next(e);
  }
};




exports.verifyOtp = async (req, res, next) => {
  try {
    const email = req.body.to || req.body.email,
      code = req.body.code || req.body.otp;
    const record = await Otp.findOne({
      email,
      otp: code,
      expiryTime: { $gt: new Date() },
    });
    if (!record)
      return res.status(400).json({ message: "Invalid or expired OTP" });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    user.verified = true;
    user.refreshToken = crypto.randomUUID();
    user.refreshTokenExpiry = new Date(Date.now() + 7 * 86400000);
    await user.save();
    await Otp.deleteOne({ _id: record._id });
    res.json({
      accessToken: generateToken(user.id, user.email, user.role),
      refreshToken: user.refreshToken,
      role: user.role,
    });
  } catch (e) {
    next(e);
  }
};




exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(req.body.password, user.password))
    )
      return res.status(401).json({ message: "Invalid credentials" });
    user.refreshToken = crypto.randomUUID();
    user.refreshTokenExpiry = new Date(Date.now() + 7 * 86400000);
    await user.save();
    res.json({
      accessToken: generateToken(user.id, user.email, user.role),
      refreshToken: user.refreshToken,
      role: user.role,
    });
  } catch (e) {
    next(e);
  }
};




exports.refresh = async (req, res, next) => {
  try {
    const user = await User.findOne({
      refreshToken: req.body.refreshToken,
      refreshTokenExpiry: { $gt: new Date() },
    });
    if (!user)
      return res.status(401).json({ message: "Invalid refresh token" });
    res.json({
      accessToken: generateToken(user.id, user.email, user.role),
      refreshToken: user.refreshToken,
      role: user.role,
    });
  } catch (e) {
    next(e);
  }
};
