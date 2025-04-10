const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
console.log("JWT_SECRET is:", process.env.JWT_SECRET);


const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to accept JSON body

// Test route
app.get("/", (req, res) => {
  res.send("API is working! 🚀");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection failed:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const propertyRoutes = require("./routes/property");
app.use("/api/properties", propertyRoutes);
