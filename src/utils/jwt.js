const jwt = require("jsonwebtoken");
const generateToken = (id, email, role) =>
  jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
    subject: email,
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });
module.exports = { generateToken };
