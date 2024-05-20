const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const User = require('../models/User');  // Import the User model

// Get all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', '-password');
    res.json(profiles);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete a profile
router.delete('/:id', async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
