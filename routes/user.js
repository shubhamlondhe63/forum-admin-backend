const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude password field from the response
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

// Delete user by ID Route
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting user");
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId, "-password"); // Exclude password field from the response
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Error fetching user");
  }
});

module.exports = router;
