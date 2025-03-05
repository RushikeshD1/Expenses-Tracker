const bcrypt = require("bcrypt")
const UserSchema = require("../model/userSchema")
const jwt = require('jsonwebtoken')

const register = async (req, res) => {

    try {
        const {userName, email, password, confirmPassword} = req.body

        if(!userName || !email || !password || !confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Please fill all fields"            
            })
        }
       
        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "confirm password doesnt match the password"            
            })
        }
        
        const existingEmail = await UserSchema.findOne({ email })

        if(existingEmail){
            return res.status(400).json({
                success : false,
                message : "Email is already registered"                  
            }) 
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password.toString(), salt);

        const newlyInsertedUser = await UserSchema.create({
            userName,
            email,
            password : hashedPassword
        })

        res.status(200).json({
            success : true,
            message : "User register successfully",    
            user : newlyInsertedUser            
        })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : "User failed to register"                  
        })
    }
    
}

const login = async (req, res) => {

    try{
        const {email, password} = req.body

        const user = await UserSchema.findOne({email})
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Username or Password is invalid"
            })
        }

        const isPasswordSame = await bcrypt.compare(password, user.password)

        if (!isPasswordSame) {
            return res.status(400).json({
            success: false,
            message: "Invalid username or password",
            });
        }

        res.status(200).json({
            success : true,
            message : "User login successfully",
        })
    }catch(err){
        res.status(400).json({
            success : false,
            message : "User failed to login"                  
        })
    }

    
}

const userController = {
    login,
    register
}

module.exports = userController