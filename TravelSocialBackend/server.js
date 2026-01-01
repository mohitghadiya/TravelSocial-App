// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// // Middlewares
// app.use(express.json());
// app.use(cors());

// // Test route (VERY IMPORTANT)
// app.get("/", (req, res) => {
//   res.json({ message: "TravelSocial API is running 🚀" });
// });

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/auth", require("./routes/otpRoutes"));


// // MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected ✔"))
//   .catch((err) => console.log("MongoDB Error:", err));

// // Start server (FIXED)
// app.listen(5000, "0.0.0.0", () => {
//   console.log("Server running on port 5000");
// });



require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "TravelSocial API is running 🚀" });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/auth", require("./routes/otpRoutes"));

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
