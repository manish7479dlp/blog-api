const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true , "email is required"],
            trim: true,
            unique: true
        },
        userName: {
            type: String,
            required: [true , "user name is required"],
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: [true , "password is required"],
            trim: true
        }
   } ,
   {
        timestamps: true
   }
)

module.exports = mongoose.model("user" , userSchema);