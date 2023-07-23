const mongoose = require("mongoose")

const connectDb = async(dbUrl) => {
    try{
       await mongoose.connect(dbUrl)
       console.log("Database Connected Successfully..")
    } catch(error) {
        console.log(error)
    }
}

module.exports = connectDb