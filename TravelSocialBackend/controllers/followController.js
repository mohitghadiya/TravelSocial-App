// controllers/followController.js
const FollowRequest = require("../models/FollowRequest");
const User = require("../models/User");

exports.sendFollowRequest = async (req, res) => {
  const receiverId = req.params.id;

  await FollowRequest.create({
    sender: req.user,
    receiver: receiverId,
  });

  res.json({ msg: "Follow request sent" });
};



exports.acceptFollowRequest = async (req, res) => {
  const requestId = req.params.id;

  const request = await FollowRequest.findById(requestId);

  if (!request) return res.status(404).json({ msg: "Request not found" });

  await User.findByIdAndUpdate(request.receiver, {
    $push: { followers: request.sender },
  });

  await User.findByIdAndUpdate(request.sender, {
    $push: { following: request.receiver },
  });

  await request.deleteOne();

  res.json({ msg: "Follow request accepted" });
};
