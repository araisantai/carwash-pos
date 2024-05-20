// app.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/serviceRoutes');
const { protect } = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Use authentication routes
app.use(authRoutes);
app.use(serviceRoutes);

// Render register and login views
app.get('/register', (req, res) => {
    res.render('register', { message: '' });
});

app.get('/login', (req, res) => {
    res.render('login', { message: '' });
});

// Protected route example
app.get('/dashboard', protect, (req, res) => {
    res.render('dashboard', { user: req.user });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
