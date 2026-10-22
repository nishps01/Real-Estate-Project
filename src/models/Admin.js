const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Admin", schema);
