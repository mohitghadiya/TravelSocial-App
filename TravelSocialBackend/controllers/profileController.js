// // controllers/profileController.js
// const User = require("../models/User");
// const Post = require("../models/Post");

// exports.getMyProfile = async (req, res) => {
//   try {
//     const userId = req.user; // from JWT middleware

//     const user = await User.findById(userId)
//       .select("-password")
//       .populate("followers following", "_id");

//     const postsCount = await Post.countDocuments({ user: userId });

//     res.json({
//       user,
//       stats: {
//         followers: user.followers.length,
//         following: user.following.length,
//         posts: postsCount,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ msg: "Profile fetch failed" });
//   }
// };


const User = require("../models/User");
const Post = require("../models/Post");

exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user; // from authMiddleware

    // Fetch user (exclude password)
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Count posts
    const postsCount = await Post.countDocuments({ user: userId });

    res.status(200).json({
      success: true,
      isMyProfile: true,   // ⭐ ADD THIS
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        bio: user.bio,
        avatar: user.avatar,
        isPrivate: user.isPrivate,
        followersCount: user.followers.length,
        followingCount: user.following.length,
        postsCount,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ msg: "Failed to fetch profile" });
  }
};


exports.updateMyProfile = async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user,
      { name, bio, avatar },
      { new: true }
    );

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Update failed" });
  }
};


////======================================================== New Method  add 02-01-2026  ===========================================////
exports.getUserProfile = async (req, res) => {
  const profileUserId = req.params.id;
  const loggedInUserId = req.user;

  const user = await User.findById(profileUserId).select("-password");
  if (!user) {
    return res.status(404).json({ success: false, msg: "User not found" });
  }

  const isMyProfile =
    loggedInUserId.toString() === profileUserId.toString();

  res.json({
    success: true,
    isMyProfile,
    user,
  });
};
