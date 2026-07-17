const express = require("express");
const axios = require("axios");

const router = express.Router();

async function fetchOverpass(query) {
  const params = new URLSearchParams();
  params.append("data", query);

  const response = await axios.post(
    "https://overpass.kumi.systems/api/interpreter",
    params.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
      },
    }
  );

  return response.data;
}

// Nearby Hospitals
router.get("/hospitals", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const query = `
      [out:json];
      (
        node["amenity"="hospital"](around:5000,${lat},${lon});
        way["amenity"="hospital"](around:5000,${lat},${lon});
        relation["amenity"="hospital"](around:5000,${lat},${lon});
      );
      out center;
    `;

    const data = await fetchOverpass(query);

    res.json(data.elements || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Unable to fetch hospitals",
    });
  }
});

// Nearby Pharmacies
router.get("/pharmacies", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const query = `
      [out:json];
      (
        node["amenity"="pharmacy"](around:5000,${lat},${lon});
        way["amenity"="pharmacy"](around:5000,${lat},${lon});
        relation["amenity"="pharmacy"](around:5000,${lat},${lon});
      );
      out center;
    `;

    const data = await fetchOverpass(query);

    res.json(data.elements || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Unable to fetch pharmacies",
    });
  }
});

module.exports = router;