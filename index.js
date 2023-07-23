const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("./config/dotenvConfig")
const connectDb = require("./config/dbConfig")
const userRoute = require("./routes/userRoute")
const postRoute = require("./routes/postRoute")

//api object
const app = express();

const dbUrl = process.env.DB_URL
const port = process.env.PORT || 8000;


//connect db
connectDb(dbUrl)

//middleware
app.use(express.json());
app.use(cors({origin: "http://localhost:3000" , credentials: true}))
app.use(cookieParser());
app.use("/uploads" , express.static(__dirname + '/uploads'))


//routes
app.use("/api/v1" , userRoute)
app.use("/api/v1" , postRoute)

//routes
app.use("/" , (req , res) => {
    try {
       res.send("hlw from the other side....") 
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

//listen port
app.listen(port , ()=> {
    console.log(`Server is running on PORT ${port}`)
})