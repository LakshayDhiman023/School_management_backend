const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { testConnection, initializeDatabase } = require('./config/db');
const schoolRoutes = require('./routes/schoolRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection and initialize
testConnection();
initializeDatabase();

// API Routes
app.use('/api', schoolRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to School Management API',
        endpoints: {
            addSchool: 'POST /api/schools',
            listSchools: 'GET /api/schools?latitude=value&longitude=value'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'production' ? null : err.message
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 