import dynamic from "next/dynamic";
import Head from "next/head";
import useSWR from "swr";

import { StyledToolbar, StyledToolbarWrap } from "@/components/Global/Global.styled";
import Header from "@/components/Header";
import type { Activity, AppPageProps } from "@/types";

const ActivityMap = dynamic(() => import("@/components/ActivityMap"), {
	ssr: false,
});

export default function Map({ onNavbarLocation, bookmarkedActivityIds }: AppPageProps) {
	const { data: activities, isLoading, error } = useSWR<Activity[]>("/api/activities");

	if (isLoading) {
		return (
			<div>
				<Head>
					<title>My Activity Map | Activity Planner</title>
				</Head>
				<Header title="My ActiviBee Map" />
				<main>
					<StyledToolbarWrap>
						<StyledToolbar />
					</StyledToolbarWrap>
					<p>Loading activity map...</p>
				</main>
			</div>
		);
	}

	if (!activities || error) {
		return (
			<div>
				<Head>
					<title>My Activity Map | Activity Planner</title>
				</Head>
				<Header title="My ActiviBee Map" />
				<main>
					<StyledToolbarWrap>
						<StyledToolbar />
					</StyledToolbarWrap>
					<p>An error occurred while fetching the activity map.</p>
				</main>
			</div>
		);
	}

	return (
		<>
			<Head>
				<title>My Activity Map | Activity Planner</title>
			</Head>
			<Header title="My ActiviBee Map" />
			<main>
				<ActivityMap
					activities={activities}
					bookmarkedActivityIds={bookmarkedActivityIds}
					onNavbarLocation={onNavbarLocation}
				/>
			</main>
		</>
	);
}
