const router = require("express").Router();
const User = require("../models/user");
const CustomRequest = require("../models/CustomRequest");
const { authenticateToken } = require("./userAuth"); // your auth middleware

// ------------------
// USER ROUTES
// ------------------

// 1. Create new custom request (user)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.headers.id;
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const {
      pieceType,
      preferredDate,
      contact,
      description,
      quantity,
      referenceMedia,
    } = req.body;

    const newRequest = new CustomRequest({
      user: userId,
      pieceType,
      preferredDate,
      contact,
      description,
      quantity,
      referenceMedia,
    });

    await newRequest.save();
    res.status(201).json({ message: "Custom request created successfully", request: newRequest });
  } catch (error) {
    console.error("Error creating custom request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 2. Get all custom requests of logged-in user
router.get("/user", authenticateToken, async (req, res) => {
  try {
    const userId = req.headers.id;
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const requests = await CustomRequest.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ requests });
  } catch (error) {
    console.error("Error fetching user custom requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 3. User requests more options for a custom request
router.post("/:id/request-more-options", authenticateToken, async (req, res) => {
  try {
    const userId = req.headers.id;
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const requestId = req.params.id;
    const { description, referenceMedia } = req.body;

    const request = await CustomRequest.findOne({ _id: requestId, user: userId });
    if (!request) return res.status(404).json({ message: "Custom request not found" });

    request.requestedMoreOptions.push({
      description,
      referenceMedia,
    });

    await request.save();

    res.status(200).json({ message: "Requested more options submitted", request });
  } catch (error) {
    console.error("Error requesting more options:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ------------------
// ADMIN ROUTES
// ------------------

// Middleware to check admin role (reuse your pattern)
async function checkAdmin(req, res, next) {
  try {
    const userId = req.headers.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(userId);
    if (!user || user.role !== "admin")
      return res.status(403).json({ message: "Admin access required" });

    next();
  } catch (error) {
    console.error("Admin check error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// 4. Admin get all custom requests
router.get("/", authenticateToken, checkAdmin, async (req, res) => {
  try {
    const requests = await CustomRequest.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ requests });
  } catch (error) {
    console.error("Error fetching all custom requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 5. Admin review and update a custom request
router.put("/:id/review", authenticateToken, checkAdmin, async (req, res) => {
  try {
    const requestId = req.params.id;
    const { status, adminMessage, adminOptions } = req.body;

    const request = await CustomRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Custom request not found" });

    if (status) request.status = status;
    if (adminMessage) request.adminMessage = adminMessage;
    if (adminOptions && Array.isArray(adminOptions)) {
      request.adminOptions = adminOptions;
    }

    await request.save();

    res.status(200).json({ message: "Custom request updated successfully", request });
  } catch (error) {
    console.error("Error updating custom request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
