const mongoose = require("mongoose");

const order= new mongoose.Schema({
    user:{
         type:mongoose.Types.ObjectId,
                ref:"user",
    },

    

       art:{
         type:mongoose.Types.ObjectId,
                ref:"Art",
    },
    status:{
         type: String,
        default: "Order placed",
        enum:["Order placed", "Out for delivery", "Delivered", "Cancelled"]
    },
},
{timestamps:true}
);
module.exports = mongoose.model("Order", order);