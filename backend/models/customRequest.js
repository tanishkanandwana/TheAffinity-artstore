const mongoose = require("mongoose");

const customRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pieceType: { type: String, required: true },
  preferredDate: { type: Date, required: true },
  contact: { type: String, required: true },
  referenceMedia: [{ type: String }], // Cloudinary URLs
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "reviewed", "completed", "cancelled"],
    default: "pending"
  },
  statusMessage: { type: String, default: "" },
  adminOptions: [{ type: String }], // Cloudinary URLs
  selectedOption: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("CustomRequest", customRequestSchema);
