const router = require("express").Router();
const CustomRequest = require("../models/CustomRequest");
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");
// const cloudinary = require('../config/cloudinary');
const cloudinary = require("../config/cloudinary");



// Multer + Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "custom_requests",
    resource_type: "auto",
  },
});
const upload = multer({ storage });


// Create Custom Request (User)
router.post(
  "/",
  authenticateToken,
  upload.array("referenceMedia", 5),
  async (req, res) => {
    try {
      console.log("📥 Incoming request to /custom-requests");
      console.log("Headers:", req.headers);
      console.log("Body:", req.body);
      console.log("Files:", req.files);

      const { id } = req.headers; // user id in header
      const user = await User.findById(id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const { pieceType, description, preferredDate, contact } = req.body;

      if (!pieceType || !description || !preferredDate || !contact) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // ✅ Safe check for req.files
      let referenceMedia = [];
      if (req.files && req.files.length > 0) {
        referenceMedia = req.files.map((file) => ({
          url: file.path,
          public_id: file.filename,
        }));
      }

      console.log("📝 Saving custom request with data:", {
        user: id,
        pieceType,
        description,
        preferredDate,
        contact,
        referenceMedia,
      });

      const customRequest = new CustomRequest({
        user: id,
        pieceType,
        description,
        preferredDate,
        contact,
        referenceMedia,
      });

      await customRequest.save();

      return res.status(201).json({
        message: "Custom request created successfully",
        customRequest,
      });
    } catch (error) {
      console.error("❌ Error creating custom request:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);
// // Create Custom Request (User)
// router.post(
//   "/",
//   authenticateToken,
//   upload.array("referenceMedia", 5),
//   async (req, res) => {
//     try {
//       const { id } = req.headers; // user id in header
//       const user = await User.findById(id);
//       if (!user) {
//         return res.status(401).json({ message: "User not found" });
//       }

//       const { pieceType, description, preferredDate, contact } = req.body;

//       if (!pieceType || !description || !preferredDate || !contact) {
//         return res.status(400).json({ message: "All fields are required" });
//       }

//       const referenceMedia = req.files.map((file) => ({
//         url: file.path,
//         public_id: file.filename,
//       }));

//       const customRequest = new CustomRequest({
//         user: id,
//         pieceType,
//         description,
//         preferredDate,
//         contact,
//         referenceMedia,
//       });

//       await customRequest.save();

//       return res.status(201).json({ message: "Custom request created successfully", customRequest });
//     } catch (error) {
//       console.error("Error creating custom request:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   }
// );

// Get logged-in user's custom requests
router.get("/my", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const requests = await CustomRequest.find({ user: id }).sort({ createdAt: -1 });
    return res.status(200).json({ status: "Success", data: requests });
  } catch (error) {
    console.error("Error fetching user's custom requests:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Admin: Get all custom requests
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    const requests = await CustomRequest.find().populate("user", "username email").sort({ createdAt: -1 });
    return res.status(200).json({ status: "Success", data: requests });
  } catch (error) {
    console.error("Error fetching all custom requests:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Admin: Update request status or add admin response
router.patch(
  "/:id",
  authenticateToken,
  upload.array("sampleMedia", 5),
  async (req, res) => {
    try {
      const { id: userId } = req.headers;
      const user = await User.findById(userId);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Admin access only" });
      }

      const { status, message } = req.body;
      const sampleMedia = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));

      const customRequest = await CustomRequest.findById(req.params.id);
      if (!customRequest) {
        return res.status(404).json({ message: "Request not found" });
      }

      if (status) customRequest.status = status;
      if (message || sampleMedia.length > 0) {
        customRequest.adminResponses.push({
          message,
          sampleMedia,
        });
      }

      await customRequest.save();
      return res.status(200).json({ message: "Request updated successfully", customRequest });
    } catch (error) {
      console.error("Error updating custom request:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const CustomRequest = require("../models/CustomRequest");
// const { authenticateToken } = require("./userAuth");
// const cloudinary = require("../config/cloudinary");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const multer = require("multer");
// const User = require("../models/user");

// // Multer storage
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "custom_requests",
//     resource_type: "auto", // allows both images & videos
//   },
// });
// const upload = multer({ storage });

// // Create custom request (User)
// router.post(
//   "/",
//   authenticateToken,
//   upload.array("referenceMedia", 5),
//   async (req, res) => {
//     try {
//       const { pieceType, description, preferredDate, contact } = req.body;

//       const referenceMedia = req.files.map(file => ({
//         url: file.path,
//         public_id: file.filename,
//       }));

//       const request = new CustomRequest({
//         user: req.headers.id,
//         pieceType,
//         description,
//         preferredDate,
//         contact,
//         referenceMedia,
//       });

//       await request.save();
//       res.status(201).json({ message: "Request submitted successfully", request });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   }
// );

// // Get user's custom requests
// router.get("/my", authenticateToken, async (req, res) => {
//   try {
//     const requests = await CustomRequest.find({ user: req.headers.id });
//     res.json(requests);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Admin: get all custom requests
// router.get("/", authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.headers.id);
//     if (user.role !== "admin") {
//       return res.status(403).json({ message: "Admin access only" });
//     }
//     const requests = await CustomRequest.find().populate("user", "username email");
//     res.json(requests);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Admin: update request
// router.patch(
//   "/:id",
//   authenticateToken,
//   upload.array("sampleMedia", 5),
//   async (req, res) => {
//     try {
//       const user = await User.findById(req.headers.id);
//       if (user.role !== "admin") {
//         return res.status(403).json({ message: "Admin access only" });
//       }

//       const { status, message } = req.body;
//       const sampleMedia = req.files.map(file => ({
//         url: file.path,
//         public_id: file.filename,
//       }));

//       const request = await CustomRequest.findById(req.params.id);
//       if (!request) {
//         return res.status(404).json({ message: "Request not found" });
//       }

//       if (status) request.status = status;
//       if (message || sampleMedia.length > 0) {
//         request.adminResponses.push({
//           message,
//           sampleMedia,
//         });
//       }

//       await request.save();
//       res.json({ message: "Request updated", request });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// );

// module.exports = router;
