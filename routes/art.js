const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
const Art = require("../models/art");



//add art --admin
router.post("/add-art", authenticateToken, async(req,res) =>{
try {
    const { id } = req.headers;   //checking admin/user
    const user = await User.findById(id);
    if(user.role !== "admin"){
        return  res.status(400).json({message:"admin operations unsupported"});
    }

    const art = new Art({
        url: req.body.url,
        type: req.body.type,
        maker: req.body.maker,
        price: req.body.price,
        desc: req.body.desc,
        form: req.body.form,
    });
    await art.save();
    res.status(200).json({message:"artform added successfully"});
} catch (error) {
    console.error("Error in /add-art route:", error);  //  log it
    res.status(500).json({ message: "Internal server error" });
}

// catch (error) {
//     res.status(500).json({message:"Internal server error"});
// }
});

//update art
router.put("/update-art", authenticateToken, async (req, res) => {
try {
     const { artid } = req.headers; 
    await Art.findByIdAndUpdate(artid, {
        url: req.body.url,
        type: req.body.type,
        maker: req.body.maker,
        price: req.body.price,
        desc: req.body.desc,
        form: req.body.form,
    });

    return res.status(200).json({message:"Artform Updated Successfully"});
    
} catch (error) {
    console.log(error);
    return res.status(500).json({message:"An error occurred"});
}
});

router.delete("/delete-art", authenticateToken, async (req, res) => {
    try {
          const { artid } = req.headers; 
          await Art.findByIdAndDelete(artid);
          return res.status(200).json({message:"Artform deleted successfully!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
});

//get all arts
router.get("/get-all-arts", async (req, res) => {
    try {
        const arts = await Art.find().sort({ createdAt: -1});
        return res.json({
            status: "Success",
            data: arts,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
});

//get recently added  arts limit to 4
router.get("/get-recent-arts", async (req, res) => {
 try {
    const arts = await Art.find().sort({ createdAt : -1}).limit(4);
    return res.json({
        status: "Success",
        data: arts,
    });
 } catch (error) {
    console.log(error);
    return res.status(500).json({message:"An error occurred"});
 }
});

//get art by id
router.get("/get-art-by-id/:id", async (req, res) => {
    try {
       const { id } = req.params;
       const art = await Art.findById(id);
       return res.json({
        status: "Success",
        data: art,
       }); 
    } catch (error) {
       console.log(error);
        return res.status(500).json({message:"An error occurred"}); 
    }
});

module.exports = router;