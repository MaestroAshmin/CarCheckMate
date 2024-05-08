const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Route to perform search
router.post('/filter', searchController.searchCars);
module.exports = router;