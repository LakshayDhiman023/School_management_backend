const { pool } = require('../config/db');

class SchoolModel {
    // Add a new school to the database
    async addSchool(schoolData) {
        try {
            const { name, address, latitude, longitude } = schoolData;
            
            const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
            const [result] = await pool.execute(query, [name, address, latitude, longitude]);
            
            return {
                id: result.insertId,
                ...schoolData
            };
        } catch (error) {
            throw error;
        }
    }

    // Get all schools sorted by proximity to a given location
    async getSchoolsByProximity(userLat, userLong) {
        try {
            // Using the Haversine formula to calculate distance
            const query = `
                SELECT 
                    id, 
                    name, 
                    address, 
                    latitude, 
                    longitude,
                    (
                        6371 * acos(
                            cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +
                            sin(radians(?)) * sin(radians(latitude))
                        )
                    ) AS distance
                FROM 
                    schools
                ORDER BY 
                    distance
            `;
            
            const [schools] = await pool.execute(query, [userLat, userLong, userLat]);
            return schools;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new SchoolModel(); 