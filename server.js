const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://shubhamlondhe63:Shubham1201@cluster0.b5mp4vi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const profileRoutes = require('./routes/profile'); 
const dashboardRoutes = require('./routes/dashboard');
const commentRoutes = require('./routes/comment');

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/comments', commentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
