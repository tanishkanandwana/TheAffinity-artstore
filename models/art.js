const mongoose = require("mongoose");


const review = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const art= new mongoose.Schema({
 url:{
    type: String,
    required:true,
 },
  type:{
    type: String,
    required:true,
 },
   maker:{
    type: String,
    required:true,
 },
  price:{
    type: Number,
    required:true,
 },
  desc:{
    type: String,
    required:true,
 },
  form:{
    type: String,
    required:true,
 },

 //new
   reviews: [review],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
},
{timestamps:true}
);
module.exports = mongoose.model("Art", art);