const post = require("../models/post");
const fs = require("fs");

const createPost = async (req, res) => {
  try {
    const id = req.user.id;
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { title, summary, description } = req.body;

    await post.create({
      title,
      summary,
      description,
      cover: newPath,
      author: id,
    });

    res
      .status(201)
      .send({ status: true, message: "Post Created Successfully." });
  } catch (error) {
    res.send({ status: false, message: "Error in Create post api" });
  }
};

const editPost = async (req, res) => {
  try {
    const postCreatorId = req.user.id;
    const postId = req.params.id;

    let newPath = "";

    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }
    const { title, summary, description } = req.body;

    const postdoc = await post.findById({ _id: postId });

    const isAuthor =
      JSON.stringify(postCreatorId) === JSON.stringify(postdoc.author);

    if (!isAuthor) {
      return res
        .status(200)
        .send({ status: false, message: "You are not author of this post." });
    }

    if (newPath) {
      fs.unlinkSync(postdoc.cover);
    }

    await post.findByIdAndUpdate(
      { _id: postId },
      {
        title,
        summary,
        description,
        cover: newPath ? newPath : postdoc.cover,
        author: postCreatorId,
      }
    );

    res
      .status(201)
      .send({ status: true, message: "Post Updated Successfully." });
  } catch (error) {
    res.send({ status: false, message: "Error in update post api" });
  }
};

const allPost = async (req, res) => {
  try {
    const posts = await post
      .find()
      .populate("author", ["userName"])
      .sort({ createdAt: -1 })
      .limit(20);

    res.send({ status: true, message: "...", posts });
  } catch (error) {
    res.send({ status: false, message: "Error in all post api." });
  }
};

const singlePost = async (req, res) => {
  try {
    const { id } = req.params;
    const singlePost = await post.findById(id).populate("author", ["userName"]);
    res.send({ status: true, message: "...", post: singlePost });
  } catch (error) {
    res.send({ status: false, message: "Error in single post api." });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletingPost = await post.findById({ _id: id });
    const cover = deletingPost.cover;
    fs.unlinkSync(cover);
    const deletedPost = await post.findByIdAndRemove({ _id: id });
    res.send({ status: true, message: "Post deleted successfully." });
  } catch (error) {
    res.send({ status: false, message: "Error in delete post api." });
  }
};

const getAllPostOfUser = async (req, res) => {
  try {
    const { id } = req.params;
    const allPost = await post.find({ author: id });
    console.log(allPost);
    res.send({
      status: true,
      message: "...",
      post: allPost,
      postCount: allPost.length,
    });
  } catch (error) {
    res.send({ status: false, message: "Error in AllPostOfUser post api." });
  }
};

module.exports = {
  createPost,
  editPost,
  allPost,
  singlePost,
  deletePost,
  getAllPostOfUser,
};
