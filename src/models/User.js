const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, unique: true, sparse: true },
    dest: { type: String, unique: true, sparse: true },
    password: String,
    role: { type: String, default: "USER", enum: ["USER", "ADMIN"] },
    active: { type: Boolean, default: true },
    verified: { type: Boolean, default: false },
    refreshToken: String,
    refreshTokenExpiry: Date,
  },
  { timestamps: true },
);
userSchema.pre("save", function (next) {
  if (!this.dest) this.dest = this.email || this.phone;
  next();
});
module.exports = mongoose.model("User", userSchema);
