const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Get all posts
// router.get('/', async (req, res) => {
//   try {
//     const comments = await Comment.find().populate('author', 'username');
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
