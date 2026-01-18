"use client";

import { useEffect, useState } from "react";

export default function OpenMap() {
  const [position, setPosition] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [MapComponent, setMapComponent] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import Leaflet components only on client side
    Promise.all([
      import("react-leaflet"),
      import("leaflet"),
      import("leaflet/dist/leaflet.css"),
      import("../../components/leaflet-icon")
    ]).then(([reactLeaflet, L]) => {
      const { MapContainer, TileLayer, Marker, Popup } = reactLeaflet;
      const Leaflet = L.default || L;
      
      const customIcon = new Leaflet.Icon({
        iconUrl: "/marker.png",
        iconSize: [48, 48],
        iconAnchor: [24, 48],
      });

      setMapComponent({ MapContainer, TileLayer, Marker, Popup, customIcon });
    });

    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setLocationError(null);
        },
        (err) => {
          // Handle geolocation errors gracefully with user-friendly messages
          let errorMessage = "Unable to get your location";
          
          if (err.code === err.PERMISSION_DENIED) {
            errorMessage = "Location access denied. Please enable location permissions.";
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            errorMessage = "Location information unavailable.";
          } else if (err.code === err.TIMEOUT) {
            errorMessage = "Location request timed out.";
          } else if (err.message && err.message.includes("secure origins")) {
            errorMessage = "Location access requires a secure connection (HTTPS).";
          } else if (err.message) {
            errorMessage = "Unable to access your location.";
          }
          
          setLocationError(errorMessage);
          // Use a default location (e.g., a central location) as fallback
          setPosition([28.6139, 77.2090]); // Default to a central location
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      // Geolocation not available, use default location
      setLocationError("Geolocation is not supported by your browser");
      setPosition([28.6139, 77.2090]); // Default location
    }
  }, []);

  if (!isClient || !MapComponent) {
    return <p>Loading map…</p>;
  }

  if (!position) {
    return <p>Fetching location…</p>;
  }

  const { MapContainer, TileLayer, Marker, Popup, customIcon } = MapComponent;

  return (
    <div>
      {locationError && (
        <div className="mb-2 p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-sm">
          {locationError} Showing default location.
        </div>
      )}
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "400px", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} icon={customIcon}>
          <Popup>{locationError ? "Default location" : "You are here"}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
