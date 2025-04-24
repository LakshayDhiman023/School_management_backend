const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'school_management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the database connection
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection established successfully!');
        connection.release();
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
};

// Create the schools table if it doesn't exist
const initializeDatabase = async () => {
    try {
        const connection = await pool.getConnection();
        
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS schools (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                latitude FLOAT NOT NULL,
                longitude FLOAT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        
        await connection.query(createTableQuery);
        console.log('Schools table initialized successfully!');
        connection.release();
    } catch (error) {
        console.error('Error initializing database:', error.message);
    }
};

module.exports = {
    pool,
    testConnection,
    initializeDatabase
}; 