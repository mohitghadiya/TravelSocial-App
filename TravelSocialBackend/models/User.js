// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },

//   mobile: {
//     type: String,
//     required: true,
//     unique: true,
//     minlength: 10,
//     maxlength: 10,
//   },

//   password: { type: String, required: true },

//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("User", UserSchema);


const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },

  mobile: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },

  password: { type: String, required: true },

  // 🔥 PROFILE FIELDS
  bio: { type: String, default: "" },
  avatar: { type: String, default: "" }, // Cloudinary URL

  // 🔐 PRIVACY
  isPrivate: { type: Boolean, default: true },

  // 👥 FOLLOW SYSTEM
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);

