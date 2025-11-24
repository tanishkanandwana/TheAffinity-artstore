// middlewares/upload.js
const multer = require("multer");
const path = require("path");

// Multer setup: store file temporarily before uploading to Cloudinary
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});

// File filter (optional: restrict to images/videos)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "video/mp4"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images/videos allowed."), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
