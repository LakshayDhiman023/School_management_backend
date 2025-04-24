const schoolModel = require('../models/schoolModel');

// Add a new school
exports.addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // Validate input data
        if (!name || !address || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required: name, address, latitude, longitude' 
            });
        }

        // Validate latitude and longitude
        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({
                success: false,
                message: 'Latitude and longitude must be valid numbers'
            });
        }

        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            return res.status(400).json({
                success: false,
                message: 'Latitude must be between -90 and 90, and longitude must be between -180 and 180'
            });
        }

        // Add the school to the database
        const newSchool = await schoolModel.addSchool({
            name,
            address,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        });

        res.status(201).json({
            success: true,
            message: 'School added successfully',
            data: newSchool
        });
    } catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add school',
            error: error.message
        });
    }
};

// List schools sorted by proximity
exports.listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // Validate input data
        if (!latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: 'Latitude and longitude are required query parameters'
            });
        }

        // Validate latitude and longitude
        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({
                success: false,
                message: 'Latitude and longitude must be valid numbers'
            });
        }

        if (parseFloat(latitude) < -90 || parseFloat(latitude) > 90 || 
            parseFloat(longitude) < -180 || parseFloat(longitude) > 180) {
            return res.status(400).json({
                success: false,
                message: 'Latitude must be between -90 and 90, and longitude must be between -180 and 180'
            });
        }

        // Get schools sorted by proximity
        const schools = await schoolModel.getSchoolsByProximity(
            parseFloat(latitude),
            parseFloat(longitude)
        );

        res.status(200).json({
            success: true,
            count: schools.length,
            data: schools
        });
    } catch (error) {
        console.error('Error listing schools:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to list schools',
            error: error.message
        });
    }
}; 