import useSWR from "swr";
import ActivityMap from "@/components/ActivityMap";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function Map() {
    const { data: activities } = useSWR("/api/activities", fetcher);

    if (!activities) return <p>Loading ...</p>;
    return <ActivityMap activities={activities} />;
}
