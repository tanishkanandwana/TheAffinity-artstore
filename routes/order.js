const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
const Art = require("../models/art");
const Order = require("../models/order");


//place order
// router.post("/place-order", authenticateToken, async (req, res) => {
//     try {
//         const { id } = req.headers;
//         const { order } = req.body;
//         for(const orderData of order){
//             const newOrder = new Order({user: id, art: orderData._id, status: "Order placed"});
//             const orderDataFromDb = await newOrder.save();
//             //saving order in user model
//             await User.findByIdAndUpdate(id, {
//                 $push: { orders: orderDataFromDb._id },
//             });
//             //clearing cart
//             await User.findByIdAndUpdate(id, {
//                 $pull: {cart: orderData._id},
//             });
//         }

//         return res.json({
//             status: "Success",
//             message: "Order placed successfully",
//         });
//     } catch (error) {
//          console.log(error);
//         return res.status(500).json({message:"Internal server error"});
//     }
// });

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

//get all orders --admin role
// router.get("/get-all-orders", authenticateToken, async (req, res) =>{
//     try {
//         const userData = await Order.find()
//         .populate({
//             path: "art",
//         })
//         .populate({
//             path: "user",
//         })
//         .sort({ createdAt: -1});
//         console.log("Orders Fetched (admin):", userData);

//         return res.json({
//             status:"Success",
//             data: userData,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({message:"Internal server error"});
//     }
// });
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
router.put("/update-status/:id", authenticateToken, async (req, res) =>{
try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, { status: req.body.status});
    return res.json({
        status: "Success",
        message: "Status updated successfully",
    });
} catch (error) {
     console.log(error);
        return res.status(500).json({message:"Internal server error"});
}
});

module.exports = router;