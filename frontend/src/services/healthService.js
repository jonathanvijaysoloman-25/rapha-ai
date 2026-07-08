const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

/* =========================
   CORE FETCH FUNCTION
========================= */
export async function fetchOverpass(query) {
  try {
    const response = await fetch(OVERPASS_URL, {
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
    return data.elements || [];
  } catch (error) {
    console.error("Overpass fetch error:", error);
    return [];
  }
}

/* =========================
   HOSPITALS
========================= */
export async function getNearbyHospitals(lat, lon, radius = 5000) {
  const query = `
    [out:json];
    (
      node["amenity"="hospital"](around:${radius},${lat},${lon});
      way["amenity"="hospital"](around:${radius},${lat},${lon});
      relation["amenity"="hospital"](around:${radius},${lat},${lon});
    );
    out center;
  `;

  const data = await fetchOverpass(query);

  return data.map((el) => {
    const latVal = el.lat || el.center?.lat;
    const lonVal = el.lon || el.center?.lon;

    return {
      id: el.id,
      type: el.type,
      lat: latVal,
      lon: lonVal,

      // ✅ FIXED NAME LOGIC (THIS FIXES YOUR ISSUE)
      name:
        el.tags?.name ||
        el.tags?.operator ||
        el.tags?.["name:en"] ||
        "Unknown Hospital",

      address:
        el.tags?.["addr:full"] ||
        el.tags?.["addr:street"] ||
        el.tags?.["addr:city"] ||
        "",
    };
  });
}

/* =========================
   PHARMACIES (UNCHANGED)
========================= */
export async function getNearbyPharmacies(lat, lon, radius = 5000) {
  const query = `
    [out:json];
    (
      node["amenity"="pharmacy"](around:${radius},${lat},${lon});
      way["amenity"="pharmacy"](around:${radius},${lat},${lon});
      relation["amenity"="pharmacy"](around:${radius},${lat},${lon});
    );
    out tags center;
  `;

  const data = await fetchOverpass(query);

  return data.map((el) => {
    const latVal = el.lat || el.center?.lat;
    const lonVal = el.lon || el.center?.lon;

    return {
      id: el.id,
      type: el.type,
      lat: latVal,
      lon: lonVal,

      name:
        el.tags?.name ||
        el.tags?.operator ||
        "Pharmacy",

      address:
        el.tags?.["addr:full"] ||
        el.tags?.["addr:street"] ||
        el.tags?.["addr:city"] ||
        "",
    };
  });
}

/* =========================
   CLINICS (UNCHANGED)
========================= */
export async function getNearbyClinics(lat, lon, radius = 5000) {
  const query = `
    [out:json];
    (
      node["amenity"="clinic"](around:${radius},${lat},${lon});
      way["amenity"="clinic"](around:${radius},${lat},${lon});
      relation["amenity"="clinic"](around:${radius},${lat},${lon});
    );
    out center;
  `;

  const data = await fetchOverpass(query);

  return data.map((el) => {
    const latVal = el.lat || el.center?.lat;
    const lonVal = el.lon || el.center?.lon;

    return {
      id: el.id,
      type: el.type,
      lat: latVal,
      lon: lonVal,

      name: el.tags?.name || "Clinic",

      address:
        el.tags?.["addr:full"] ||
        el.tags?.["addr:street"] ||
        "",
    };
  });
}