const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  images: {
    type: [String], // Cloudinary URLs
    required: true,
  },

  caption: { type: String, default: "" },
  location: { type: String, default: "" },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
