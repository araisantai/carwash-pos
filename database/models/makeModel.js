// models/transactionModel.js
const db = require('../db');

// Model for transactions table
class Transaction {
    // Method to create a new transaction
    static async create(transactionData) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO transactions SET ?';
            db.query(sql, transactionData, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = Transaction;
