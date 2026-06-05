import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

export default function ActivityMap({ activities }) {
    const [coords, setCoords] = useState("");

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
            style={{ height: "500px", width: "100vw" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {activities.map((activity) => {
                const position = coords[activity.country];
                if (!position) return null;
                return (
                    <Marker key={activity._id} position={position}>
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
