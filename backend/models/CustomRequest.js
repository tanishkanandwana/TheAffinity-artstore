const mongoose = require("mongoose");

const customRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pieceType: { type: String, required: true },
    description: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    contact: { type: String, required: true },
    referenceMedia: [
      { url: String, public_id: String }
    ],
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    adminResponses: [
      {
        message: String,
        sampleMedia: [{ url: String, public_id: String }],
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomRequest", customRequestSchema);
