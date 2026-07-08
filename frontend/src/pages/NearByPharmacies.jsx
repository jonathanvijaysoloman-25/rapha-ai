import { useEffect, useState } from "react";
import Map from "../components/MapPharmacy";
import { getNearbyPharmacies } from "../services/locationService";

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

export default function NearbyPharmacies() {
  const [position, setPosition] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          setPosition([lat, lon]);

          const data = await getNearbyPharmacies(lat, lon);

          const enriched = data.map((p) => ({
            ...p,
            distance:
              p.lat && p.lon
                ? getDistance(lat, lon, p.lat, p.lon).toFixed(2)
                : null,
          }));

          setPharmacies(enriched);
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
    ? pharmacies
    : pharmacies.filter((pharmacy) =>
        (pharmacy.name || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold text-red-500 mb-4">
        Nearby Pharmacies
      </h1>

      {loading && <p>Loading location...</p>}

      {!loading && position && (
        <Map
          position={position}
          pharmacies={filtered}
        />
      )}

      <input
        className="w-full p-3 mt-4 mb-6 bg-gray-900 rounded"
        placeholder="Search pharmacies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-4 md:grid-cols-2">

        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-gray-900 p-4 rounded-xl border border-gray-700"
          >
            <h2 className="text-lg font-bold">
              {p.name || "Unknown Pharmacy"}
            </h2>

            <p className="text-gray-400">
              {p.address || "Address not available"}
            </p>

            {p.distance && (
              <p className="text-green-400">
                {p.distance} km away
              </p>
            )}

            <a
              className="text-red-400 underline mt-2 block"
              href={`https://www.google.com/maps?q=${p.lat},${p.lon}`}
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