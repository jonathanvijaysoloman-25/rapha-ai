import { useEffect, useState } from "react";
import Map from "../components/Map";
import { getNearbyHospitals } from "../services/locationService";

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function NearbyHospitals() {
  const [position, setPosition] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          setPosition([lat, lon]);

          const data = await getNearbyHospitals(lat, lon);

          const enriched = data.map((h) => ({
            ...h,
            distance:
              h.lat && h.lon
                ? getDistance(lat, lon, h.lat, h.lon).toFixed(2)
                : null,
          }));

          setHospitals(enriched);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
      () => {
        alert("Location permission denied");
        setLoading(false);
      }
    );
  }, []);

  // ✅ React 19 recommended pattern
  const filtered = !search.trim()
    ? hospitals
    : hospitals.filter((hospital) =>
        (hospital.name || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold text-red-500 mb-4">
        Nearby Hospitals
      </h1>

      {loading && <p>Loading location...</p>}

      {!loading && position && (
        <Map
          position={position}
          hospitals={filtered}
        />
      )}

      <input
        className="w-full p-3 mt-4 mb-6 bg-gray-900 rounded"
        placeholder="Search hospitals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-4 md:grid-cols-2">

        {filtered.map((h) => (
          <div
            key={h.id}
            className="bg-gray-900 p-4 rounded-xl border border-gray-700"
          >
            <h2 className="text-lg font-bold">
              {h.name || "Unknown Hospital"}
            </h2>

            <p className="text-gray-400">
              {h.address || "Address not available"}
            </p>

            {h.distance && (
              <p className="text-green-400">
                {h.distance} km away
              </p>
            )}

            <a
              className="text-red-400 underline mt-2 block"
              href={`https://www.google.com/maps?q=${h.lat},${h.lon}`}
              target="_blank"
              rel="noreferrer"
            >
              Open in Maps
            </a>
          </div>
        ))}

      </div>
    </div>
  );
}