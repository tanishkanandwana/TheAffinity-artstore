const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//add artforms to favourites
router.put("/add-art-to-favourite", authenticateToken, async (req, res) => {
    try {
        const { artid, id} = req.headers;
        const userData = await User.findById(id);
        const isArtFavourite = userData.favourites.includes(artid);
        if(isArtFavourite){
            return res.status(200).json({message:"Artform already exists in favourites!"});
        }
        await User.findByIdAndUpdate(id, {$push: { favourites: artid}});
        return res.status(200).json({message:"Artform added to favourites"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
});

//remove artforms to favourites
router.put("/remove-art-from-favourite", authenticateToken, async (req, res) => {
    try {
        const { artid, id} = req.headers;
        const userData = await User.findById(id);
        const isArtFavourite = userData.favourites.includes(artid);
        if(isArtFavourite){
          await User.findByIdAndUpdate(id, {$pull: { favourites: artid}});
        }
        return res.status(200).json({message:"Artform removed from favourites"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
});

//get favourite artforms of particular user
router.get("/get-favourite-arts", authenticateToken, async (req, res) => {
try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favouriteArts = userData.favourites;
    return res.json({
        status: "Success",
        data: favouriteArts,
    });

    
} catch (error) {
     console.log(error);
        return res.status(500).json({message:"Internal server error"});
    
}
});

module.exports = router;