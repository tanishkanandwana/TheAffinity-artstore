const mongoose = require("mongoose");

const customRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  giftType: { type: String, required: true },
  description: { type: String, required: true },
  preferredDate: { type: Date, required: false },
  contactInfo: { type: String, required: true },
  referenceFile: { type: String, required: false }, // URL to image/video
  status: { type: String, default: "Pending" }, // Pending, Options Shared, Ordered
  adminOptions: [String], // Array of design URLs
  selectedOption: { type: String }, // URL of selected design
}, { timestamps: true });

module.exports = mongoose.model("CustomRequest", customRequestSchema);
