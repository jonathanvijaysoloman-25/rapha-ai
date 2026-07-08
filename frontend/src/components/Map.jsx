import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map({ position, hospitals }) {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* User location */}
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Hospitals */}
      {hospitals.map((h) =>
        h.lat && h.lon ? (
          <Marker key={h.id} position={[h.lat, h.lon]}>
            <Popup>
              <b>{h.name || "Unknown Hospital"}</b>
              <br />
              {h.address || "No address"}
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}