

const express = require("express");
const Newsletter = require("../models/Newsletter");
const User = require("../models/user");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");
const { authenticateToken } = require("./userAuth");
// const { default: AdminSubscribers } = require("../../frontend/src/pages/AdminSubscribers");

// POST - Subscribe
// router.post("/", async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const exists = await Newsletter.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "You are already subscribed!" });
//     }

//     const newSubscriber = new Newsletter({ email });
//     await newSubscriber.save();

//     res.status(201).json({ message: "Subscribed successfully!" });
//   } catch (error) {
//     console.error("Error subscribing:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "You are already subscribed!" });
    }

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    // Send confirmation email
    await sendEmail({
      to: email,
      subject: "Thanks for subscribing to The Affinity Newsletter!",
      text: `Hi! Thanks for subscribing to our newsletter. You'll now receive updates on new art, offers, and stories.`,
      html: `<p>Hi!</p><p>Thanks for subscribing to our newsletter. You'll now receive updates on new art, offers, and stories.</p>`,
    });

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Error subscribing:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// GET - Get all subscribers (admin)
router.get("/", async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ date: -1 });
    res.json(subscribers);
  } catch (err) {
    console.error("Error fetching subscribers:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE - Delete subscriber by ID (admin)
router.delete("/:id", async (req, res) => {
  try {
    await Newsletter.findByIdAndDelete(req.params.id);
    res.json({ message: "Subscriber deleted" });
  } catch (err) {
    console.error("Error deleting subscriber:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// for Admin-----------------------------

// GET all subscribers - admin only
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;  // user id from headers

    const user = await User.findById(id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const subscribers = await Newsletter.find().sort({ date: -1 });
    res.json(subscribers);
  } catch (err) {
    console.error("Error fetching subscribers:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE subscriber by ID - admin only
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id: userId } = req.headers; // user id from headers
    const user = await User.findById(userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    await Newsletter.findByIdAndDelete(req.params.id);
    res.json({ message: "Subscriber deleted" });
  } catch (err) {
    console.error("Error deleting subscriber:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/send-update", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized. Admins only." });
    }

    const { subject, message } = req.body;
    if (!subject || !message) {
      return res.status(400).json({ message: "Subject and message are required" });
    }

    // Get all subscriber emails
    const subscribers = await Newsletter.find({});
    if (!subscribers.length) {
      return res.status(400).json({ message: "No subscribers to send updates." });
    }

    // Send email to each subscriber (could optimize with Promise.all)
    await Promise.all(
      subscribers.map((sub) =>
        sendEmail({
          to: sub.email,
          subject,
          text: message,
          html: `<p>${message}</p>`,
        })
      )
    );

    res.status(200).json({ message: "Update sent to all subscribers successfully." });
  } catch (error) {
    console.error("Error sending update emails:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

