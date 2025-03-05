const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserSchema = require("../model/userSchema");

dotenv.config()

const authMiddleware = async (req, res, next) =>{
    try {
        const bearerToken = req.headers.authorization;

        if(!bearerToken){
            return res.status(401).json({
              success: false,
              message: "bearer token not found",
            });
        }

        const token = bearerToken.split(" ")[1];        
        jwt.verify(token, process.env.SECERT_KEY)
        
        const tokenData = jwt.decode(token)
        
        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);

        if (currentTimeInSeconds > tokenData.exp) {        
            return res.status(401).json({
                success: false,
                message: "Time expired",
            });
        }

        const user = await UserSchema.findById(tokenData.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is Unauthorized",
            });
        }

        req.user = user;
        next();      
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Error while user is unauthorized",
        });
    }
}

module.exports = authMiddleware