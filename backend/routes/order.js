const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
const Art = require("../models/art");
const Order = require("../models/order");



router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    console.log("📦 Incoming order array:", order);

    for (const orderData of order) {
      // Safely extract art ID
      const artId = orderData._id || orderData;

      if (!artId) {
        console.log("⚠️ Skipping item due to missing art ID:", orderData);
        continue;
      }

      console.log("🛒 Creating order for art ID:", artId);

      const newOrder = new Order({
        user: id,
        art: artId, // ✅ Ensure art field is set
        status: "Order placed",
      });

      const orderDataFromDb = await newOrder.save();

      // Save order in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      // Remove from cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: artId },
      });
    }

    return res.json({
      status: "Success",
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log("❌ Error placing order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


//get order history of particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
       const { id } = req.headers;
       console.log("Fetching order history for user ID:", id);

       const userData = await User.findById(id).populate({
        path: "orders",
        populate: 
        {path: "art",
            model: "Art",
        },
       }); 

       
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    //    const ordersData = (userData.orders || []).reverse();
    const ordersData = (userData.orders || [])
  .filter(order => order && order.art)  // filters orders with missing art
  .reverse();

       return res.json({
        status: "Success",
        data: ordersData,
       });
    } catch (error) {
         console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
});



router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate("art")
      .populate("user")
      .sort({ createdAt: -1 });

    console.log("Total orders fetched:", userData.length);
    userData.forEach((order, idx) => {
      console.log(`Order #${idx + 1}:`);
      console.log("Art:", order.art ? order.art._id : "❌ MISSING");
      console.log("User:", order.user ? order.user._id : "❌ MISSING");
    });

    return res.json({
      status: "Success",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


//update order --admin role
router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Optionally check if status is allowed
    const allowedStatuses = ["Order placed", "Out for delivery", "Delivered", "Canceled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json({
      status: "Success",
      message: "Status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;