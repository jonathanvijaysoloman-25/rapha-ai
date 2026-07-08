import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapPharmacy({ position, pharmacies }) {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* User Location */}
      <Marker position={position}>
        <Popup>
          <b>You are here</b>
        </Popup>
      </Marker>

      {/* Pharmacies */}
      {pharmacies.map((pharmacy) =>
        pharmacy.lat && pharmacy.lon ? (
          <Marker
            key={pharmacy.id}
            position={[pharmacy.lat, pharmacy.lon]}
          >
            <Popup>
              <b>{pharmacy.name || "Unknown Pharmacy"}</b>
              <br />
              {pharmacy.address || "Address unavailable"}
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}