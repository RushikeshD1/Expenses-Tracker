const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        require : true
    },
    email :{
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true
    },
    token : {
        type : String,
        default : null,
        required: false,
    }
})

const UserSchema = mongoose.model("users", userSchema)

module.exports = UserSchema
