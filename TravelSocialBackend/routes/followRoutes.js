const express = require("express");
const router = express.Router();
const followController = require("../controllers/followController");
const auth = require("../middleware/authMiddleware");

// later we will add logic
// router.post("/request/:id", auth, followController.sendFollowRequest);

module.exports = router;
