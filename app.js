const express = require("express");
const cors = require("cors");
const app = express();

const allowedOrigins = [
  "https://celadon-florentine-b0fac0.netlify.app",
  "https://stately-biscuit-b90e00.netlify.app",
  "http://localhost:5173"
];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Enable preflight for all routes
app.options("*", cors());


app.use(express.json());
app.use('/images', express.static('images'));

require("dotenv").config();
require("./conn/conn");
const user = require("./routes/user");
const Arts = require("./routes/art");
const favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

// app.use(express.json());
//routes
// app.use("/api/v1", user);
// app.use("/api/v1", Arts);
// app.use("/api/v1", favourite);
// app.use("/api/v1", Cart);
// app.use("/api/v1", Order);
app.use("/api/v1/users", user);
app.use("/api/v1/arts", Arts);
app.use("/api/v1/favourites", favourite);
app.use("/api/v1/cart", Cart);
app.use("/api/v1/orders", Order);

//
// app.get("/", (req,res) =>{
//     res.send("hello from backend side");
// });
//CREATING PORT
// app.listen(process.env.PORT, () =>{
//     console.log(`server started at port ${process.env.PORT}`);
// });

const PORT = process.env.PORT || 1000; // fallback for localhost

app.get("/", (req, res) => {
  res.send("✅ Backend is live and responding!");
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
