const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null){
        return res.status(401).json({message:"Authenthication token required"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
        if(err){
            return res.status(403).json({message:"Token expired, please sign in or login again"});
        }
        console.log("JWT_SECRET being used:", process.env.JWT_SECRET);
        req.user = user;
        next();
    });
};



module.exports = { authenticateToken };