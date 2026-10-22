const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    phone: String,
    otp: { type: String, required: true },
    expiryTime: { type: Date, required: true },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Otp", schema);
