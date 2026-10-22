const r = require("express").Router();
const c = require("../controllers/authController");

r.post("/send-otp", c.sendOtp);
r.post("/verify-otp", c.verifyOtp);
r.post("/login", c.login);
r.post("/refresh", c.refresh);
module.exports = r;
