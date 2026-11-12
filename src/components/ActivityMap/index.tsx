import L, { type LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import type { Activity } from "@/types";

import { StyledPopupCountry, StyledPopupLink, StyledPopupTitle } from "./ActivityMap.styled";

interface Props {
	activities: Activity[];
	onNavbarLocation: (location: string) => void;
	bookmarkedActivityIds: string[];
}

type CountryCoords = Record<string, { latlng: LatLngTuple; name: string }>;

export default function ActivityMap({
	activities,
	onNavbarLocation,
	bookmarkedActivityIds,
}: Props) {
	const [coords, setCoords] = useState<CountryCoords>({});

	const activityPin = L.icon({
		iconUrl: "/icons/activibee-pin.svg",
		iconSize: [40, 40],
		iconAnchor: [20, 40],
	});

	const bookmarkedActivityPin = L.icon({
		iconUrl: "/icons/activibee-pin--bookmarked.svg",
		iconSize: [40, 40],
		iconAnchor: [20, 40],
	});

	const createClusterCustomIcon = (cluster: { getChildCount: () => number }) => {
		return L.divIcon({
			html: `<img src="/icons/activibee-pin.svg" width="40" height="40" /><span>${cluster.getChildCount()}</span>`,
			className: "custom-marker-cluster",
			iconSize: L.point(60, 40),
		});
	};

	useEffect(() => {
		async function fetchCoords() {
			const results: CountryCoords = {};
			for (const activity of activities) {
				if (!activity.country) continue;
				const response = await fetch(
					`https://restcountries.com/v3.1/alpha/${activity.country}`,
				);
				if (!response.ok) continue;
				const [data] = await response.json();
				results[activity.country] = {
					latlng: data.latlng,
					name: data.name.common,
				};
			}
			setCoords(results);
		}
		fetchCoords();
	}, [activities]);

	return (
		<MapContainer
			center={[20, 0]}
			zoom={2}
			style={{ flexGrow: 1, height: "100%", width: "100vw", zIndex: 1 }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				className="map-tiles"
			/>
			<MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
				{activities.map((activity) => {
					if (!activity.country) return null;
					const position = coords[activity.country]?.latlng;
					if (!position) return null;

					const isBookmarked = bookmarkedActivityIds.includes(activity._id);
					return (
						<Marker
							key={activity._id}
							position={position}
							icon={isBookmarked ? bookmarkedActivityPin : activityPin}
						>
							<Popup>
								<StyledPopupTitle>{activity.title}</StyledPopupTitle>
								<br />
								<StyledPopupCountry>
									{coords[activity.country]?.name}
								</StyledPopupCountry>
								<br />
								<StyledPopupLink
									href={`/${activity._id}`}
									onClick={() => onNavbarLocation(`/${activity._id}`)}
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
