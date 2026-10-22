const nodemailer = require("nodemailer");
function transporter() {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASSWORD) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASSWORD },
  });
}
async function send(to, subject, text) {
  const t = transporter();
  if (!t) {
    console.log(`[mail skipped] ${subject} -> ${to}`);
    return;
  }
  await t.sendMail({ from: process.env.MAIL_USER, to, subject, text });
}
module.exports = {
  sendOtp: (email, otp) =>
    send(email, "Your OTP", `Your OTP is ${otp}. It expires in 5 minutes.`),
  bookingRequestMail: (email, name, title) =>
    send(
      email,
      "Booking request received",
      `Hi ${name}, your visit request for ${title} was received.`,
    ),
  bookingConfirmedMail: (email, name, title) =>
    send(
      email,
      "Booking approved",
      `Hi ${name}, your visit request for ${title} was approved.`,
    ),
  bookingRejectedMail: (email, name, title) =>
    send(
      email,
      "Booking rejected",
      `Hi ${name}, your visit request for ${title} was rejected.`,
    ),
};
