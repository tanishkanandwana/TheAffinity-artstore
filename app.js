const express = require("express");
const cors = require("cors");
const app = express();
app.use('/images', express.static('images'));
app.use(cors());
require("dotenv").config();
require("./conn/conn");
const user = require("./routes/user");
const Arts = require("./routes/art");
const favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

app.use(express.json());
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
app.listen(process.env.PORT, () =>{
    console.log(`server started at port ${process.env.PORT}`);
});