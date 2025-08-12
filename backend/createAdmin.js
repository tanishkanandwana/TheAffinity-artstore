// createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user'); // adjust path if necessary

async function run() {
await mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

  const username = "adminUser";
  const email = "admin@example.com";
  const plainPassword = "admin123"; // replace
  const existing = await User.findOne({ username });
  if (existing) {
    console.log("User already exists:", existing._id.toString());
    return process.exit(0);
  }
  const hash = await bcrypt.hash(plainPassword, 10);
  const newUser = new User({
    username,
    email,
    password: hash,
    role: "admin",
    address: "address"
  });
  await newUser.save();
  console.log("Admin created:", newUser._id.toString());
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
