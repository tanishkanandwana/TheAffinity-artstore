const mongoose = require("mongoose");

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
},
{timestamps:true}
);
module.exports = mongoose.model("Art", art);