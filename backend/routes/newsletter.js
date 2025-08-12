// const express = require("express");
// const Newsletter = require("../models/Newsletter");
// const router = express.Router();

// // POST - Subscribe
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

// module.exports = router;

const express = require("express");
const Newsletter = require("../models/Newsletter");
const router = express.Router();

// POST - Subscribe
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

module.exports = router;

