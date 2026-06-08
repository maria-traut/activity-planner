import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useState, useEffect } from "react";
import {
    StyledPopupTitle,
    StyledPopupCountry,
    StyledPopupLink,
} from "./ActivityMap.styled";

export default function ActivityMap({ activities, onNavbarLocation }) {
    const [coords, setCoords] = useState("");

    const customIcon = L.icon({
        iconUrl: "/Activibeepin_6-6-2026.svg",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });

    const createClusterCustomIcon = (cluster) => {
        return L.divIcon({
            html: `<img src="/Activibeepin_6-6-2026.svg" width="40" height="40" /><span>${cluster.getChildCount()}</span>`,
            className: "custom-marker-cluster",
            iconSize: L.point(60, 40),
        });
    };

    useEffect(() => {
        async function fetchCoords() {
            const results = {};
            for (const activity of activities) {
                if (!activity.country) continue;
                const response = await fetch(
                    `https://restcountries.com/v3.1/alpha/${activity.country}`
                );
                if (!response.ok) continue;
                const [data] = await response.json();
                results[activity.country] = {
                    latlng: data.latlng,
                    name: data.name.common,
                };
            }
            setCoords(results);
            console.log("test", coords);
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
            <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
                {activities.map((activity) => {
                    const position = coords[activity.country]?.latlng;
                    if (!activity.country || !position) return null;
                    return (
                        <Marker
                            key={activity._id}
                            position={position}
                            icon={customIcon}
                        >
                            <Popup>
                                <StyledPopupTitle>
                                    {activity.title}
                                </StyledPopupTitle>
                                <br />
                                <StyledPopupCountry>
                                    {coords[activity.country]?.name}
                                </StyledPopupCountry>
                                <br />
                                <StyledPopupLink
                                    href={`/${activity._id}`}
                                    onClick={() =>
                                        onNavbarLocation(`/${activity._id}`)
                                    }
                                >
                                    Go to ActiviBee
                                </StyledPopupLink>
                            </Popup>
                        </Marker>
                    );
                })}
            </MarkerClusterGroup>
        </MapContainer>
    );
}
