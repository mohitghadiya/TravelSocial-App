const express = require("express");
const router = express.Router();
const { getMyPosts } = require("../controllers/postController");
const auth = require("../middleware/authMiddleware");

router.get("/me", auth, getMyPosts);

module.exports = router;
