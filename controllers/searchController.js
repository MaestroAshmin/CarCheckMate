const Car = require("../models/Car");
// Server URL
const serverUrl = 'http://localhost:3000';

module.exports.config = {
  api: {
    bodyParser: false,
  },
};
//Search API
async function searchCars(req, res) {
    try {
        console.log(req.body);
        // Extract search parameters from request body
        // Extract search parameters from request body
        const { minPrice, maxPrice, year, make, model, color, verified } = req.body;
  
        // Construct the search query based on the parameters
        const searchQuery = {};
  
        if (minPrice && minPrice.trim() !== '' && minPrice !== 'Any') searchQuery.price = { $gte: parseInt(minPrice) };
        if (maxPrice && maxPrice.trim() !== '' && maxPrice !== 'Any') {
            searchQuery.price = searchQuery.price || {};
            searchQuery.price.$lte = parseInt(maxPrice);
        }
        if (year && year.trim() !== '' && year !== 'Any') searchQuery.year = year;
        if (make && make.trim() !== '' && make !== 'Any') searchQuery.make = make;
        if (model && model.trim() !== '' && model !== 'Any') searchQuery.model = model;
        if (color && color.trim() !== '' && color !== 'Any') searchQuery.color = color;
        if (verified && verified.trim() !== '' && verified !== 'Any') searchQuery.verified = verified;
        // Add condition to exclude cars that have been sold
        searchQuery.hasBeenSold = false;
        // Perform the search using the constructed query
        const searchResults = await Car.find(searchQuery);
  
        // Return the search results
        res.status(200).json({ searchResults });
    } catch (error) {
        console.error('Error performing search:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  }
  module.exports = { searchCars };