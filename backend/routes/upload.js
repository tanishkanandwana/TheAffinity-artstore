const router = require("express").Router();

const uploadImages = require("../middlewares/uploadImages");
const cloudinary = require("../config/cloudinary");
const CustomUpload = require("../models/customUpload");
const { authenticateToken } = require("./userAuth");

const streamifier = require("streamifier");

router.post(
  "/upload-images/:artId",
  authenticateToken,
  uploadImages.array("images", 10),
  async (req, res) => {
    try {
      const userId = req.headers.id;
      const { artId } = req.params;

      const uploadedUrls = [];

      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "theaffinityarts",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          streamifier.createReadStream(file.buffer).pipe(stream);
        });

        uploadedUrls.push(result.secure_url);
      }

      const existingUpload = await CustomUpload.findOne({
        user: userId,
        art: artId,
      });

      if (existingUpload) {
        existingUpload.imageUrls = uploadedUrls;
        await existingUpload.save();
      } else {
        await CustomUpload.create({
          user: userId,
          art: artId,
          imageUrls: uploadedUrls,
        });
      }

      res.status(200).json({
        success: true,
        imageUrls: uploadedUrls,
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message: "Upload failed",
      });
    }
  }
);

module.exports = router;