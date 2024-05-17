// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST request for user registration
router.post('/register', authController.register);

// POST request for user login
router.post('/login', authController.login);

module.exports = router;
