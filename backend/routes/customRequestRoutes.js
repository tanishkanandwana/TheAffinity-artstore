const express = require("express");
const router = express.Router();
// const upload = require("../middlewares/upload");
const uploadImages = require("../middlewares/uploadImages");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
// const cloudinary = require("../utils/cloudinary");
// const authenticateToken = require("../middleware/authenticateToken");
const { authenticateToken } = require("./userAuth");
const CustomRequest = require("../models/CustomRequest");

// ================= USER SIDE =================

// @desc Create a new custom request
// @route POST /api/v1/custom-requests
// @access Private (only logged in users)
// router.post("/", authenticateToken, async (req, res) => {
  router.post(
  "/",
  authenticateToken,
  // upload.single("file"),
  uploadImages.single("file"),
  async (req, res) => {
  try {
    const { artworkType, description, preferredDate, contact } = req.body;

    // Cloudinary file (if attached through multer)
//     let fileUrl = "";
//    if (req.file) {
//   fileUrl = req.file.path;
// }

let fileUrl = "";

if (req.file) {
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "custom-requests",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });

  fileUrl = result.secure_url;
}
    const newRequest = await CustomRequest.create({
      user: req.user.id, // from JWT middleware
      artworkType,
      description,
      preferredDate,
      contact,
      file: fileUrl,
    });

    res.status(201).json({
      success: true,
      data: newRequest,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc Get all requests of a logged-in user
// @route GET /api/v1/custom-requests/my-requests
// @access Private
router.get("/my-requests", authenticateToken, async (req, res) => {
  try {
    const requests = await CustomRequest.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ================= ADMIN SIDE =================

// Middleware: check if role is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Access denied: Admins only" });
  }
  next();
};

// @desc Get all custom requests
// @route GET /api/v1/custom-requests
// @access Admin
router.get("/", authenticateToken, isAdmin, async (req, res) => {
  try {
    const requests = await CustomRequest.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: requests,
    });
  } 
  // catch (error) {
  //   res.status(500).json({ success: false, message: error.message });
  // }
  catch (error) {
  console.error("CUSTOM REQUEST ADMIN ERROR:");
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
});



// @desc Update a custom request (status/response)
// @route PUT /api/v1/custom-requests/:id
// @access Admin
router.put("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { status, adminResponse } = req.body;

    const updated = await CustomRequest.findByIdAndUpdate(
      req.params.id,
      { status, adminResponse },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

