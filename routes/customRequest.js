const router = require("express").Router();
const CustomRequest = require("../models/customRequest");
const { authenticateToken } = require("./userAuth");
const User = require("../models/user");
// Submit a custom request (User)
router.post("/submit", authenticateToken, async (req, res) => {
  try {
    const { giftType, description, preferredDate, contactInfo, referenceFile } = req.body;

    const request = new CustomRequest({
      userId: req.user.id,
      giftType,
      description,
      preferredDate,
      contactInfo,
      referenceFile,
    });

    await request.save();
    res.status(201).json({ message: "Custom request submitted", request });
  } catch (error) {
    console.error("Custom request error:", error);
    res.status(500).json({ message: "Failed to submit custom request" });
  }
});

// Get all custom requests for a user
router.get("/user/:userId", authenticateToken, async (req, res) => {
  try {
    const requests = await CustomRequest.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch custom requests" });
  }
});

// Admin uploads options
router.patch("/upload-options/:id", authenticateToken, async (req, res) => {
  try {
    const { adminOptions } = req.body;

    const updated = await CustomRequest.findByIdAndUpdate(
      req.params.id,
      { adminOptions, status: "Options Shared" },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to upload options" });
  }
});

// User selects final option
router.patch("/confirm-option/:id", authenticateToken, async (req, res) => {
  try {
    const { selectedOption } = req.body;

    const updated = await CustomRequest.findByIdAndUpdate(
      req.params.id,
      { selectedOption, status: "Ordered" },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to confirm selected option" });
  }
});

// Get all custom requests (Admin only)
router.get("/all", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.headers.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const allRequests = await CustomRequest.find().sort({ createdAt: -1 }).populate("userId", "name email");
    res.json(allRequests);
  } catch (error) {
    console.error("Error fetching all custom requests:", error);
    res.status(500).json({ message: "Failed to fetch custom requests" });
  }
});

module.exports = router;
