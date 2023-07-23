const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    // const { token } = req.cookies;

    const token = req.header("Authorization");
    const jwtData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = jwtData;
    next();
  } catch (error) {
    res.send({ status: false, message: "Error in user Auth api", error });
  }
};

module.exports = userAuth;
