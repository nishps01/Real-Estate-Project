const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    location: { type: String, index: true },
    price: { type: Number, required: true, index: true },
    type: { type: String, enum: ["BUY", "RENT"], uppercase: true },
    bedrooms: Number,
    bathrooms: Number,
    squareFeet: Number,
    imageUrls: [String],
    featured: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Property", schema);
