const express = require("express");
const router = express.Router();
const CustomRequest = require("../models/CustomRequest");
const { authenticateToken } = require("./userAuth");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const User = require("../models/user");

// Multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "custom_requests",
    resource_type: "auto", // allows both images & videos
  },
});
const upload = multer({ storage });

// Create custom request (User)
router.post(
  "/",
  authenticateToken,
  upload.array("referenceMedia", 5),
  async (req, res) => {
    try {
      const { pieceType, description, preferredDate, contact } = req.body;

      const referenceMedia = req.files.map(file => ({
        url: file.path,
        public_id: file.filename,
      }));

      const request = new CustomRequest({
        user: req.headers.id,
        pieceType,
        description,
        preferredDate,
        contact,
        referenceMedia,
      });

      await request.save();
      res.status(201).json({ message: "Request submitted successfully", request });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Get user's custom requests
router.get("/my", authenticateToken, async (req, res) => {
  try {
    const requests = await CustomRequest.find({ user: req.headers.id });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: get all custom requests
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.headers.id);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }
    const requests = await CustomRequest.find().populate("user", "username email");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: update request
router.patch(
  "/:id",
  authenticateToken,
  upload.array("sampleMedia", 5),
  async (req, res) => {
    try {
      const user = await User.findById(req.headers.id);
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Admin access only" });
      }

      const { status, message } = req.body;
      const sampleMedia = req.files.map(file => ({
        url: file.path,
        public_id: file.filename,
      }));

      const request = await CustomRequest.findById(req.params.id);
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }

      if (status) request.status = status;
      if (message || sampleMedia.length > 0) {
        request.adminResponses.push({
          message,
          sampleMedia,
        });
      }

      await request.save();
      res.json({ message: "Request updated", request });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
