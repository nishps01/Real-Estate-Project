const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Contact",
  new mongoose.Schema(
    { name: String, email: String, phone: String, message: String },
    { timestamps: true },
  ),
);
