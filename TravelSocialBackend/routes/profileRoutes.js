// const express = require("express");
// const router = express.Router();

// const { getMyProfile, updateMyProfile } = require("../controllers/profileController");
// const auth = require("../middleware/authMiddleware");

// router.get("/me", auth, getMyProfile);
// router.put("/me", auth, updateMyProfile);

// router.get("/test", (req, res) => {
//   res.json({ msg: "Profile route working" });
// });


// module.exports = router;


const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getMyProfile,
  getUserProfile,
  updateMyProfile,
} = require("../controllers/profileController");

router.get("/me", auth, getMyProfile);
router.put("/me", auth, updateMyProfile);

router.get("/users/:id", auth, getUserProfile);

module.exports = router;
