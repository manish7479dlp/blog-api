const express = require("express");
const {
  userRegistration,
  userLogin,
  userProfile,
  userLogout,
  userUpdate,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

//api routes
const route = express.Router();

//user register  || POST
route.post("/user/register", userRegistration);

//user login || POST
route.post("/user/login", userLogin);

//user profile ||   GET
route.get("/user", authMiddleware, userProfile);

//user logout

route.get("/user/logout", authMiddleware, userLogout);

route.put("/user/update", authMiddleware, userUpdate);

module.exports = route;
