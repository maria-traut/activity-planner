import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

export default function ActivityMap({ activities }) {
    const [coords, setCoords] = useState("");

    const customIcon = L.icon({
        iconUrl: "/Activibeepin_6-6-2026.svg",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });

    useEffect(() => {
        async function fetchCoords() {
            const results = {};
            for (const activity of activities) {
                const response = await fetch(
                    `https://restcountries.com/v3.1/alpha/${activity.country}`
                );
                if (!response.ok) continue;
                const [data] = await response.json();
                results[activity.country] = data.latlng;
            }
            setCoords(results);
        }
        fetchCoords();
    }, [activities]);

    return (
        <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: "100vh", width: "100vw", zIndex: 1 }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {activities.map((activity) => {
                const position = coords[activity.country];
                if (!position) return null;
                return (
                    <Marker
                        key={activity._id}
                        position={position}
                        icon={customIcon}
                    >
                        <Popup>
                            {activity.title}
                            <br /> {activity.country}
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}
