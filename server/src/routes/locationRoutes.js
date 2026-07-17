const express = require("express");
const axios = require("axios");

const router = express.Router();

const API_KEY = process.env.GEOAPIFY_API_KEY;

async function getPlaces(lat, lon, category) {
  const url = "https://api.geoapify.com/v2/places";

  const response = await axios.get(url, {
    params: {
      categories: category,
      filter: `circle:${lon},${lat},5000`,
      bias: `proximity:${lon},${lat}`,
      limit: 20,
      apiKey: API_KEY,
    },
  });

  return response.data.features || [];
}

// =========================
// Nearby Hospitals
// =========================
router.get("/hospitals", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const places = await getPlaces(
      lat,
      lon,
      "healthcare.hospital"
    );

    const hospitals = places.map((place) => ({
      id: place.properties.place_id,
      lat: place.properties.lat,
      lon: place.properties.lon,
      tags: {
        name: place.properties.name || "Unknown Hospital",
        "addr:full": place.properties.formatted || "",
      },
    }));

    res.json(hospitals);
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      error: "Unable to fetch hospitals",
    });
  }
});

// =========================
// Nearby Pharmacies
// =========================
router.get("/pharmacies", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const places = await getPlaces(
      lat,
      lon,
      "healthcare.pharmacy"
    );

    const pharmacies = places.map((place) => ({
      id: place.properties.place_id,
      lat: place.properties.lat,
      lon: place.properties.lon,
      tags: {
        name: place.properties.name || "Unknown Pharmacy",
        "addr:full": place.properties.formatted || "",
      },
    }));

    res.json(pharmacies);
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      error: "Unable to fetch pharmacies",
    });
  }
});

// =========================
// Nearby Diagnostics
// =========================
router.get("/diagnostics", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const places = await getPlaces(
      lat,
      lon,
      "healthcare.clinic"
    );

    const diagnostics = places.map((place) => ({
      id: place.properties.place_id,
      lat: place.properties.lat,
      lon: place.properties.lon,
      tags: {
        name: place.properties.name || "Diagnostic Center",
        "addr:full": place.properties.formatted || "",
      },
    }));

    res.json(diagnostics);
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      error: "Unable to fetch diagnostics",
    });
  }
});

module.exports = router;