// routes/dashboard.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Profile = require('../models/Profile');
const Comment = require('../models/Comment');
const Like = require('../models/Like');

// Route to get total number of users
router.get('/users/total', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json(totalUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching total users');
  }
});

// Route to get total number of profiles
router.get('/profiles/total', async (req, res) => {
  try {
    const totalProfiles = await Profile.countDocuments();
    res.json(totalProfiles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching total profiles');
  }
});

// Route to get total number of comments
router.get('/comments/total', async (req, res) => {
  try {
    const totalComments = await Comment.countDocuments();
    res.json(totalComments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching total comments');
  }
});

// Route to get total number of likes
router.get('/likes/total', async (req, res) => {
  try {
    const totalLikes = await Like.countDocuments();
    res.json(totalLikes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching total likes');
  }
});

module.exports = router;
