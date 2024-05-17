// controllers/posController.js
const Transaction = require('../database/models/transactionModel');

// Create a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                transaction
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
