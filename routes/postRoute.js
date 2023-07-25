const express = require("express")
const uploadMiddleware = require("../middleware/uploadMiddleware")
const authMiddleware = require("../middleware/authMiddleware")
const {createPost, allPost , singlePost, editPost , deletePost, getAllPostOfUser} = require("../controllers/postController");

const route = express.Router();

//create post || POST

route.post("/post" , uploadMiddleware.single('file'), authMiddleware, createPost)


//get all post || GET

route.get('/post', allPost)

//get single  post || GET

route.get('/post/:id' ,authMiddleware, singlePost)

route.put("/post/:id" , uploadMiddleware.single('file'),authMiddleware,editPost)

route.delete("/post/:id" , deletePost)

route.get("/post/user/:id" ,authMiddleware, getAllPostOfUser)

module.exports = route