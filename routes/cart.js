const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");


//put art to cart
//add to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { artid, id } = req.headers;
        const userData = await User.findById(id);
        const isArtInCart= userData.cart.includes(artid);
        if(isArtInCart){
            return res.json({
                status: "Success",
                message: "Artform is already in cart",
            });
        }
        await User.findByIdAndUpdate(id, {
            $push: { cart: artid },
        });
        return res.json({
            status: "Success",
            message: "Art added to cart",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
});

//remove from cart
router.put("/remove-from-cart/:artid", authenticateToken, async (req, res) => {
try {
    const { artid } = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, {
        $pull: {cart: artid},
    });

    return res.json({
        status: "Success",
        message: "Artform removed from cart",
    });
} catch (error) {
    console.log(error);
        return res.status(500).json({message:"Internal server error"});
}
});

///get a cart of a particular user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();

        return res.json({
            status: "Success",
            data: cart,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
});
module.exports = router;