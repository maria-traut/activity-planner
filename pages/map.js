import useSWR from "swr";
import dynamic from "next/dynamic";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

const ActivityMap = dynamic(() => import("@/components/ActivityMap"), {
    ssr: false,
});

export default function Map() {
    const { data: activities } = useSWR("/api/activities", fetcher);

    if (!activities) return <p>Loading ...</p>;
    return <ActivityMap activities={activities} />;
}
