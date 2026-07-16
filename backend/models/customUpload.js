const mongoose = require("mongoose");

const customUploadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    art: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Art",
      required: true,
    },

    imageUrls: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomUpload", customUploadSchema);