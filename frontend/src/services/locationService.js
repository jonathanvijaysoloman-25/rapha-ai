export async function getNearbyHospitals(lat, lon) {
  const query = `
    [out:json];
    (
      node["amenity"="hospital"](around:5000,${lat},${lon});
      way["amenity"="hospital"](around:5000,${lat},${lon});
      relation["amenity"="hospital"](around:5000,${lat},${lon});
    );
    out center;
  `;

  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
      body: query,
    });

    if (!response.ok) {
      throw new Error("Overpass API error: " + response.status);
    }

    const data = await response.json();

    return (data.elements || []).map((el) => {
      return {
        id: el.id,
        type: el.type,
        lat: el.lat || el.center?.lat,
        lon: el.lon || el.center?.lon,

        // ✅ FULL NAME FIX
        name:
          el.tags?.name ||
          el.tags?.["name:en"] ||
          el.tags?.["name:en-US"] ||
          el.tags?.official_name ||
          el.tags?.operator ||
          el.tags?.brand ||
          "Unknown Hospital",

        address:
          el.tags?.["addr:full"] ||
          el.tags?.["addr:street"] ||
          el.tags?.["addr:city"] ||
          "",
      };
    });
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return [];
  }
}




export async function getNearbyPharmacies(lat, lon) {
  const query = `
    [out:json];
    (
      node["amenity"="pharmacy"](around:5000,${lat},${lon});
      way["amenity"="pharmacy"](around:5000,${lat},${lon});
      relation["amenity"="pharmacy"](around:5000,${lat},${lon});
    );
    out center;
  `;

  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
      body: query,
    });

    if (!response.ok) {
      throw new Error("Overpass API error: " + response.status);
    }

    const data = await response.json();

    return (data.elements || []).map((el) => ({
      id: el.id,
      type: el.type,
      lat: el.lat || el.center?.lat,
      lon: el.lon || el.center?.lon,

      name:
        el.tags?.name ||
        el.tags?.brand ||
        el.tags?.operator ||
        el.tags?.["name:en"] ||
        "Unknown Pharmacy",

      address:
        el.tags?.["addr:full"] ||
        el.tags?.["addr:street"] ||
        el.tags?.["addr:city"] ||
        "",
    }));
  } catch (error) {
    console.error("Error fetching pharmacies:", error);
    return [];
  }
}