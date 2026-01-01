// const express = require("express");
// const axios = require("axios");
// const Otp = require("../models/Otp");

// const router = express.Router();

// /* ================= SEND OTP ================= */
// router.post("/send-otp", async (req, res) => {
//   try {
//     const { phone } = req.body;

//     if (!phone || phone.length !== 10) {
//       return res.status(400).json({
//         success: false,
//         message: "Valid 10 digit phone number required",
//       });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     await Otp.create({
//       phone,
//       otp,
//       expiresAt: Date.now() + 5 * 60 * 1000,
//     });

//     const response = await axios.post(
//       "https://www.fast2sms.com/dev/bulkV2",
//       {
//         route: "otp",
//         numbers: phone,
//         message: `Your OTP is ${otp}`,
//       },
//       {
//         headers: {
//           authorization: process.env.FAST2SMS_API_KEY,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("FAST2SMS RESPONSE:", response.data);

//     if (!response.data.return) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP sending failed",
//         error: response.data,
//       });
//     }

//     return res.json({
//       success: true,
//       message: "OTP sent successfully",
//     });

//   } catch (error) {
//     console.error(
//       "OTP SEND ERROR:",
//       error.response?.data || error.message
//     );

//     return res.status(500).json({
//       success: false,
//       message: "OTP sending failed",
//       error: error.response?.data || error.message,
//     });
//   }
// });

// /* ================= VERIFY OTP ================= */
// router.post("/verify-otp", async (req, res) => {
//   try {
//     const { phone, otp } = req.body;

//     const record = await Otp.findOne({ phone, otp });

//     if (!record) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP",
//       });
//     }

//     if (record.expiresAt < Date.now()) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP expired",
//       });
//     }

//     await Otp.deleteMany({ phone });

//     return res.json({
//       success: true,
//       message: "OTP verified successfully",
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "OTP verification failed",
//     });
//   }
// });

// module.exports = router;


const express = require("express");
const axios = require("axios");
const Otp = require("../models/Otp");

const router = express.Router();




router.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    console.log("📲 OTP REQUEST RECEIVED FOR:", phone); // 👈 THIS IS WHAT YOU WANT


    if (!phone || phone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Valid 10 digit phone number required",
      });
    }

    // 🔥 THIS IS WHAT YOU WANT
    console.log("📲 OTP REQUEST RECEIVED FOR MOBILE:", phone);

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    await Otp.create({
      phone,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "otp",
        numbers: phone,
        message: `Your OTP is ${otp}`,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📩 FAST2SMS RESPONSE:", response.data);

    if (!response.data.return) {
      return res.status(400).json({
        success: false,
        message: "OTP sending failed",
        error: response.data,
      });
    }

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error(
      "❌ OTP SEND ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "OTP sending failed",
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;