const express = require("express");
const router = express.Router();
const Property = require("../models/property");
const authMiddleware = require("../middleware/authMiddleware");

// 🔐 Only logged in users can add
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, description, price, location, propertyType } = req.body;

    const newProperty = new Property({
      title,
      description,
      price,
      location,
      propertyType,
      createdBy: req.user.id,
    });

    await newProperty.save();
    res.status(201).json({ message: "Property added", property: newProperty });
  } catch (err) {
    res.status(500).json({ message: "Error adding property", error: err.message });
  }
});

// 🔓 Public: Get all properties (filterable later)
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find().populate("createdBy", "name email");
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Error fetching properties" });
  }
});

module.exports = router;
