/*const axios = require("axios");

const getNearbyDoctors = async (req, res) => {
  try {
    const { lat, lng, query } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude required",
      });
    }

    const searchQuery = query || "hospital doctor clinic";

    // OpenStreetMap Nominatim API
    const url = `https://nominatim.openstreetmap.org/search`;

    const response = await axios.get(url, {
      params: {
        format: "json",
        q: searchQuery,
        limit: 10,
        viewbox: `${lng - 0.1},${lat + 0.1},${lng + 0.1},${lat - 0.1}`,
        bounded: 1,
      },
      headers: {
        "User-Agent": "Rapha-AI-Project"
      }
    });

    const doctors = response.data.map((place) => ({
      name: place.display_name.split(",")[0],
      address: place.display_name,
      lat: place.lat,
      lng: place.lon,
    }));

    return res.json({
      success: true,
      doctors,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch nearby doctors",
    });
  }
};

module.exports = { getNearbyDoctors };*/

const axios = require("axios");

const getNearbyDoctors = async (req, res) => {
  try {
    console.log("🔥 Doctor API hit");

    const { lat, lng, query } = req.query;

    // Validate input
    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required",
      });
    }

    const searchQuery = query || "hospital clinic doctor pharmacy";

    const url = "https://nominatim.openstreetmap.org/search";

    const response = await axios.get(url, {
      params: {
        format: "json",
        q: searchQuery,
        limit: 10,
        bounded: 1,

        // better bounding box (fixes empty results issue)
        viewbox: [
          parseFloat(lng) - 0.1,
          parseFloat(lat) + 0.1,
          parseFloat(lng) + 0.1,
          parseFloat(lat) - 0.1,
        ].join(","),
      },
      headers: {
        "User-Agent": "Rapha-AI-Project",
        "Accept-Language": "en",
      },
      timeout: 10000,
    });

    const doctors = response.data.map((place) => ({
      name: place.display_name?.split(",")[0] || "Unknown",
      address: place.display_name || "No address available",
      lat: place.lat,
      lng: place.lon,
    }));

    return res.json({
      success: true,
      count: doctors.length,
      doctors,
    });

  } catch (error) {
    console.error("Doctor API Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch nearby doctors",
      error: error.message,
    });
  }
};

module.exports = { getNearbyDoctors };