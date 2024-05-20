const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Register Route
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    
    try {
        // Validate input data
        if (!username || !password || !role) {
            return res.status(400).send('All fields are required');
        }

        // Check if username already exists
        const existingUser = await Admin.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Admin({ username, password: hashedPassword, role });
        await newUser.save();
        res.status(201).send('User registered');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Validate input data
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        const user = await Admin.findOne({ username });
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id, role: user.role }, "Secretkey", { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    }
});

module.exports = router;
