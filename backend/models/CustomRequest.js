// backend/models/CustomRequest.js
const mongoose = require("mongoose");

const customRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // link to User model
      required: true,
    },
    artworkType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    preferredDate: {
      type: Date,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    file: {
      type: String, // Cloudinary URL (image/video)
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    adminResponse: {
      type: String, // Admin can add updates/sample URLs/messages
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomRequest", customRequestSchema);
