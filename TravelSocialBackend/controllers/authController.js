const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.signup = async (req, res) => {
    console.log("🔥🔥🔥 SIGNUP API HIT", req.body);

  try {
    const { name, mobile, password, otp } = req.body;


    if (!name || !mobile || !password || !otp) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // 1️⃣ Check if user exists
    let user = await User.findOne({ mobile });
    if (user) return res.status(400).json({ msg: "Mobile number already registered" });

    // 2️⃣ (OPTIONAL) OTP verification placeholder
    if (otp !== "123456") {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    const newUser = await User.create({
      name,
      mobile,
      password: hashedPassword,
    });

    res.json({ msg: "Signup successful", user: newUser });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// LOGIN


exports.login = async (req, res) => {
console.log("🚨🚨🚨 LOGIN API HIT", req.body);

  try {
    const { mobile, password } = req.body;
    const user = await User.findOne({ mobile });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d"
    });

    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
