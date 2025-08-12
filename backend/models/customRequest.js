const mongoose = require("mongoose");

const customRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",  // same collection name as your User model
    required: true,
  },
  pieceType: {
    type: String,
    required: true,
  },
  preferredDate: {
    type: Date,
  },
  contact: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  referenceMedia: [
    {
      type: String, // URLs or Cloudinary public IDs of images/videos uploaded by user
    },
  ],
  status: {
    type: String,
    enum: ["pending", "reviewed", "completed"],
    default: "pending",
  },
  adminMessage: {
    type: String,
    default: "",
  },
  adminOptions: [
    {
      title: String, // description/title of each option provided by admin
      files: [String], // array of URLs/public IDs for images/videos admin uploads
      price: Number,  // optional, if you want to associate price per option
    },
  ],
  requestedMoreOptions: [
    {
      description: String,
      referenceMedia: [String], // user can request more options with description & reference media
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("CustomRequest", customRequestSchema);
