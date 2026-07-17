const API_BASE = "https://rapha-ai-server.onrender.com/api/location";

export async function getNearbyHospitals(lat, lon) {
  try {
    const response = await fetch(
      `${API_BASE}/hospitals?lat=${lat}&lon=${lon}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch hospitals");
    }

    const data = await response.json();

    return (data || []).map((el) => ({
      id: el.id,
      type: el.type,
      lat: el.lat || el.center?.lat,
      lon: el.lon || el.center?.lon,

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
    }));
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return [];
  }
}

export async function getNearbyPharmacies(lat, lon) {
  try {
    const response = await fetch(
      `${API_BASE}/pharmacies?lat=${lat}&lon=${lon}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch pharmacies");
    }

    const data = await response.json();

    return (data || []).map((el) => ({
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