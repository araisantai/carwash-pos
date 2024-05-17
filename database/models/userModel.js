// models/userModel.js
const db = require('../db');
const bcrypt = require('bcryptjs');

class User {
    // Create a new user
    static async create(userData) {
        return new Promise(async (resolve, reject) => {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const sql = 'INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)';
            db.query(sql, [userData.username, hashedPassword, userData.isAdmin], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    // Find a user by username
    static async findByUsername(username) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE username = ?';
            db.query(sql, [username], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }
}

module.exports = User;