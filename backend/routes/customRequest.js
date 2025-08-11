const express = require("express");
const router = express.Router();
const { authenticateToken } = require("./userAuth");
const CustomRequest = require("../models/customRequest");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Multer Cloudinary storage setup with proper params key
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "customRequests",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "avi"], // add more as needed
    resource_type: "auto", // allow images & videos automatically
  },
});

const upload = multer({ storage });

// ================= USER ROUTES =================

// Submit custom request with reference media upload
router.post(
  "/",
  authenticateToken,
  upload.array("referenceMedia", 3),
  async (req, res) => {
    try {
      const files = req.files ? req.files.map(file => file.path) : [];
      const { pieceType, preferredDate, contact, description, quantity } = req.body;

      // Validation (optional, you can extend)
      if (!pieceType || !preferredDate || !contact || !description || !quantity) {
        return res.status(400).json({ message: "All required fields must be provided." });
      }

      const request = new CustomRequest({
        userId: req.user.id,
        pieceType,
        preferredDate,
        contact,
        referenceMedia: files,
        description,
        quantity,
      });

      await request.save();
      res.status(201).json({ message: "Custom request submitted", request });
    } catch (error) {
      console.error("Error submitting custom request:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// Get logged-in user's custom requests
router.get("/my", authenticateToken, async (req, res) => {
  try {
    const requests = await CustomRequest.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching user's requests:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Select an option (user)
router.put("/:id/select-option", authenticateToken, async (req, res) => {
  try {
    const { selectedOption } = req.body;
    if (!selectedOption) {
      return res.status(400).json({ message: "Selected option is required" });
    }
    const request = await CustomRequest.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { selectedOption },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json(request);
  } catch (error) {
    console.error("Error selecting option:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Request more options with new description and optional reference media upload (user)
router.post(
  "/:id/request-more-options",
  authenticateToken,
  upload.array("referenceMedia", 3),
  async (req, res) => {
    try {
      const files = req.files ? req.files.map(file => file.path) : [];
      const { description } = req.body;

      const updateFields = {
        $push: { referenceMedia: { $each: files } },
        description,
        status: "pending",
      };

      // Using findOneAndUpdate with $push and update fields atomically
      const request = await CustomRequest.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        updateFields,
        { new: true }
      );
      if (!request) return res.status(404).json({ message: "Request not found" });

      res.json({ message: "Requested more options", request });
    } catch (error) {
      console.error("Error requesting more options:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// ================= ADMIN ROUTES =================

// Middleware for admin role check
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied: Admins only" });
  next();
};

// Get all custom requests (admin)
router.get("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const requests = await CustomRequest.find().populate("userId", "username email");
    res.json(requests);
  } catch (error) {
    console.error("Error fetching all requests:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update status and status message (admin)
router.put("/:id/update-status", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status, statusMessage } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });

    const request = await CustomRequest.findByIdAndUpdate(
      req.params.id,
      { status, statusMessage },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json(request);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Upload admin options files (images/videos) (admin)
router.post(
  "/:id/upload-options",
  authenticateToken,
  requireAdmin,
  upload.array("adminOptions", 5),
  async (req, res) => {
    try {
      const files = req.files ? req.files.map(file => file.path) : [];
      if (!files.length) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const request = await CustomRequest.findByIdAndUpdate(
        req.params.id,
        { $push: { adminOptions: { $each: files } }, status: "reviewed" },
        { new: true }
      );
      if (!request) return res.status(404).json({ message: "Request not found" });

      res.json({ message: "Options uploaded", request });
    } catch (error) {
      console.error("Error uploading admin options:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = router;
