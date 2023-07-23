const express = require("express");
const { userRegistration, userLogin, userProfile, userLogout } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware")

//api routes
const route = express.Router();

//user register  || POST
route.post("/user/register" , userRegistration)

//user login || POST
route.post("/user/login" , userLogin)

//user profile ||   GET
route.get("/user" , authMiddleware , userProfile)

//user logout

route.get("/user/logout",authMiddleware , userLogout)


module.exports = route;