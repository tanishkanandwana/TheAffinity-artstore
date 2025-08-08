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

// Get arts by category/type
router.get("/get-arts-by-type/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const arts = await Art.find({ type }); // Exact match
    return res.json({
      status: "Success",
      data: arts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
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


// Add review to an art
router.post("/:id/review", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params; // art ID
    const userId = req.headers.id;
    const { rating, comment } = req.body;

    const art = await Art.findById(id);
    const user = await User.findById(userId);

    if (!art || !user) {
      return res.status(404).json({ message: "Art or User not found" });
    }

    // Check if already reviewed
    const alreadyReviewed = art.reviews.find(
      (rev) => rev.user.toString() === userId
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "You have already reviewed this art" });
    }

    const newReview = {
      user: userId,
      name: user.username,
      rating: Number(rating),
      comment,
    };

    art.reviews.push(newReview);
    art.numReviews = art.reviews.length;
    art.rating = art.reviews.reduce((acc, item) => item.rating + acc, 0) / art.reviews.length;

    await art.save();
    res.status(201).json({ message: "Review added successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all reviews for an art
router.get("/:id/reviews", async (req, res) => {
  try {
    const art = await Art.findById(req.params.id);
    if (!art) return res.status(404).json({ message: "Art not found" });

    res.json(art.reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;