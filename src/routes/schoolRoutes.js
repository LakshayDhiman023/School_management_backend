const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

// POST /api/schools - Add a new school
router.post('/schools', schoolController.addSchool);

// GET /api/schools - List schools by proximity
router.get('/schools', schoolController.listSchools);

module.exports = router; 