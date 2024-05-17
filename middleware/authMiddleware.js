// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = 'your_jwt_secret_key';

exports.protect = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        res.redirect('/login');
    }
};

exports.admin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
