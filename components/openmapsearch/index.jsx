"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";

// ---------- Custom Marker ----------
const customIcon = new L.Icon({
  iconUrl: "/marker.png",
  iconSize: [48, 48],
  iconAnchor: [24, 48],
});

// ---------- Fly to location ----------
function FlyToLocation({ position }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 15, { duration: 1.2 });
  }, [position, map]);

  return null;
}

export default function OpenMapAutocomplete() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [position, setPosition] = useState(null);
  const [label, setLabel] = useState("");
  const debounceRef = useRef(null);

  // ---------- Get user location ----------
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setLabel("You are here");
      },
      () => {
        setPosition([28.6139, 77.209]); // fallback
        setLabel("Default location");
      }
    );
  }, []);

  // ---------- Autocomplete ----------
  const handleChange = (value) => {
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          value
        )}&limit=5`
      );

      const data = await res.json();
      setSuggestions(data);
    }, 400);
  };

  // ---------- Select suggestion ----------
  const selectLocation = (item) => {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);

    setPosition([lat, lon]);
    setLabel(item.display_name);
    setQuery(item.display_name);
    setSuggestions([]);
  };

  if (!position) return <p>Loading map…</p>;

  return (
    <div style={{ position: "relative" }}>
      {/* Search Input */}
      <input
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search city, place, address…"
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 8,
          border: "1px solid #ccc",
          marginBottom: 4,
        }}
      />

      {/* Autocomplete Dropdown */}
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            zIndex: 1000,
            background: "#fff",
            width: "100%",
            listStyle: "none",
            padding: 0,
            margin: 0,
            borderRadius: 8,
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            maxHeight: 240,
            overflowY: "auto",
          }}
        >
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => selectLocation(item)}
              style={{
                padding: "10px 12px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}

      {/* Map */}
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "400px", width: "100%", marginTop: 12 }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToLocation position={position} />

        <Marker position={position} icon={customIcon}>
          <Popup>{label}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
