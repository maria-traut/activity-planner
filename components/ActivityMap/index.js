import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ActivityMap({ activities }) {
    return (
        <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: "500px", width: "100vw" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
    );
}

/*
    {activities.map((activity) => (
                <li key={activity._id}>{activity.country}</li>))}
*/
