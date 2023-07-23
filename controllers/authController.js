const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegistration = async (req, res, next) => {
  try {
    const { userName, password, email } = req.body;

    // all fields check.
    if (!email) {
      res.send({ status: false, message: "Email is required." });
    } else if (!userName) {
      res.send({ status: false, message: "UserName is required." });
    } else if (!password) {
      res.send({ status: false, message: "Password is required." });
    }
    // //check user is exist or not.
    const existingUser = await user.findOne({ userName });

    if (existingUser) {
      res
        .status(200)
        .send({ status: false, message: "user-name already Exist." });
    } else {
      const salt = 10;
      const hashPassword = await bcrypt.hash(password, salt);

      const createdUser = await user.create({
        email,
        userName,
        password: hashPassword,
      });
      res
        .status(201)
        .send({ status: true, message: "User register successfully." });
    }
  } catch (error) {
    res.send({
      status: false,
      message: "Error occurs in user-registration",
      error,
    });
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    if (!userName) {
      res.send({ status: false, message: "userName is not mention." });
    } else if (!password) {
      res.send({ status: false, message: "password is not mention" });
    }

    const existingUser = await user.findOne({ userName });

    if (!existingUser) {
      res.status(404).send("Invalid Credential.");
    } else {
      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (!isMatch) {
        res.status(404).send({ status: false, message: "Invalid Credential." });
      } else {
        const token = jwt.sign(
          { id: existingUser._id, userName },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );
        res
          .cookie("token", token ,  { maxAge: 900000, httpOnly: true })
          .send({ status: true, message: "Login successful", user: existingUser });
      }
    }
  } catch (error) {
    res.send({ status: false, message: "Error occurs in user-login", error });
  }
};

const userLogout = async (req, res) => {
  try {
    res.cookie('token' , '').send({status: true , message : "Logout Successful."})
  } catch (error) {
    console.log(error)
    res.send({status: false , message: "Error occur in user logout api."})
  }
};
const userProfile = async (req, res, next) => {
  try {
    const {id} = req.user
    const userDoc = await user.findById({ _id: id });
    res.status(200).send({ status: true, message: "..." , user : userDoc });
  } catch (error) {
    res
      .status(505)
      .send({ status: false, message: "Error in user profile api" });
  }
};

const getProfile = async(req , res , next) => {
  try {
    
  } catch (error) {
    res.send({status: false , message: "Error in profile api.", error})
  }
}

module.exports = { userRegistration, userLogin, userLogout, userProfile };
