const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    email: String,
    phone: String,
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    propertyTitle: String,
    propertyImage: String,
    visitDate: Date,
    visitTime: String,
    message: String,
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Booking", schema);
