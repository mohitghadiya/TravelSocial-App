// controllers/postController.js
const Post = require("../models/Post");

exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user })
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch posts" });
  }
};
