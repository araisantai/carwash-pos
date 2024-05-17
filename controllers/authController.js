// controllers/authController.js
const User = require('../database/models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'your_jwt_secret_key';

// Register a new user
exports.register = async (req, res) => {
    try {
        const { username, password, isAdmin } = req.body;
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(400).render('register', { message: 'User already exists' });
        }
        // Convert 'isAdmin' value to boolean
        const isAdminValue = isAdmin === 'on' ? true : false;
        const newUser = await User.create({ username, password, isAdmin: isAdminValue });
        const token = jwt.sign({ id: newUser.id, isAdmin: newUser.isAdmin }, secretKey, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).render('register', { message: err.message });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(400).render('login', { message: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).render('login', { message: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, secretKey, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).render('login', { message: err.message });
    }
};
