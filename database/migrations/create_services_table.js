// migrations/create_services_table.js
const connection = require('../db');

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

const createServicesTable = `
    CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

connection.query(createServicesTable, (err, result) => {
    if (err) {
        console.error('Error creating services table:', err);
    } else {
        console.log('Services table created successfully');
    }
    connection.end();
});
