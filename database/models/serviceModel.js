// models/serviceModel.js
const db = require('../db');

class Service {
    // Create a new service
    static async create(serviceData) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO services (name, description, price) VALUES (?, ?, ?)';
            db.query(sql, [serviceData.name, serviceData.description, serviceData.price], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    // Find all services
    static async findAll() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM services';
            db.query(sql, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    // Find a service by ID
    static async findById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM services WHERE id = ?';
            db.query(sql, [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    // Update a service by ID
    static async updateById(id, serviceData) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE services SET name = ?, description = ?, price = ? WHERE id = ?';
            db.query(sql, [serviceData.name, serviceData.description, serviceData.price, id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    // Delete a service by ID
    static async deleteById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM services WHERE id = ?';
            db.query(sql, [id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = Service;
