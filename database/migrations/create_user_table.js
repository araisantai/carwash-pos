// migrations/create_users_table.js
const connection = require('../db');

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        isAdmin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;


connection.query(createUsersTable, (err, result) => {
    if (err) {
        console.error('Error creating users table:', err);
        connection.end();
        return;
    }
    console.log('Users table created successfully');

    const insertUser = `
        INSERT INTO users (id, username, password, isAdmin, created_at)
        VALUES (1, 'tafam', '$2a$10$ZtCcZ1KZZCT8EuhBLMh8RO8s7FWwSMkXayEydekQM3AUzfSn9MtY2', 1, CURRENT_TIMESTAMP)
    `;

    connection.query(insertUser, (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
        } else {
            console.log('User inserted successfully');
        }
        connection.end();
    });
});