import Head from "next/head";
import { type FormEvent, useEffect, useState } from "react";
import useSWR from "swr";

import ActivityFilter from "@/components/ActivityFilter";
import ActivityList from "@/components/ActivityList";
import ActivitySort from "@/components/ActivitySort";
import { scrollToTop } from "@/components/Global";
import {
	StyledButtonWithIcon,
	StyledButtonWithIconIcon,
	StyledButtonWithIconText,
	StyledStatusMessage,
	StyledStatusMessageWrap,
	StyledToolbar,
} from "@/components/Global/Global.styled";
import Header from "@/components/Header";
import { defaultActivityFilterConfiguration } from "@/lib/activityFilter";
import {
	type ActivitySortOrder,
	defaultActivitySortConfiguration,
	getActivitySortLabel,
	getSortedActivities,
} from "@/lib/activitySort";
import type { Activity, AppPageProps } from "@/types";

export default function Bookmarks({
	handleBookmarkToggle,
	bookmarkedActivityIds,
	onNavbarLocation,
}: AppPageProps) {
	const [activityFilterConfiguration, setActivityFilterConfiguration] = useState(
		defaultActivityFilterConfiguration,
	);

	const filterQuery = new URLSearchParams({
		title: activityFilterConfiguration.title,
		area: activityFilterConfiguration.area,
		categories: activityFilterConfiguration.categories.join(","),
		country: activityFilterConfiguration.country.join(","),
		categoriesEvery: String(activityFilterConfiguration.categoriesEvery),
	}).toString();

	const {
		data: activities,
		isLoading: activitiesLoading,
		error: activitiesError,
	} = useSWR<Activity[]>(`/api/activities?${filterQuery}`);

	const isLoading = activitiesLoading;
	const hasError = activitiesError;

	const bookmarkedActivities = activities?.filter((activity) =>
		bookmarkedActivityIds.includes(activity._id),
	);

	const [activitySortConfiguration, setActivitySortConfiguration] = useState<ActivitySortOrder>(
		defaultActivitySortConfiguration,
	);

	const sortedBookmarkedActivities = getSortedActivities(
		bookmarkedActivities,
		activitySortConfiguration,
	);

	const [isActivityFilterOpen, setIsActivityFilterOpen] = useState(false);
	const [isActivityFiltered, setIsActivityFiltered] = useState(false);

	const [isActivitySortOpen, setIsActivitySortOpen] = useState(false);
	const [isActivitySorted, setIsActivitySorted] = useState(false);

	useEffect(() => {
		onNavbarLocation(`/bookmarks`);
	});

	function handleActivityFilterApply(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		setActivityFilterConfiguration({
			title: String(formData.get("title") ?? ""),
			categories: formData.getAll("categories").map(String),
			country: formData.getAll("country").map(String),
			area: String(formData.get("area") ?? ""),
			categoriesEvery: formData.has("categoriesEvery"),
		});
		setIsActivityFilterOpen(false);
		setIsActivityFiltered(true);
	}

	function handleActivityFilterReset() {
		setIsActivityFilterOpen(false);
		setIsActivityFiltered(false);

		setActivityFilterConfiguration(defaultActivityFilterConfiguration);
	}

	function handleActivitySortApply(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		setActivitySortConfiguration(formData.get("order") as ActivitySortOrder);

		setIsActivitySortOpen(false);
		setIsActivitySorted(true);
	}

	function handleActivitySortReset() {
		setIsActivitySorted(false);
		setIsActivitySortOpen(false);

		setActivitySortConfiguration(defaultActivitySortConfiguration);
	}

	if (isLoading) {
		return (
			<>
				<Head>
					<title>My ActivibeeHive | ActiviBee</title>
				</Head>
				<Header title="My ActivibeeHive" />
				<main>
					<StyledStatusMessageWrap>
						<StyledStatusMessage>Loading activities...</StyledStatusMessage>
					</StyledStatusMessageWrap>
				</main>
			</>
		);
	}

	if (hasError) {
		return (
			<>
				<Head>
					<title>My ActivibeeHive | ActiviBee</title>
				</Head>
				<Header title="My ActivibeeHive" />
				<main>
					<StyledStatusMessageWrap>
						<StyledStatusMessage>Activities could not be loaded.</StyledStatusMessage>
					</StyledStatusMessageWrap>
				</main>
			</>
		);
	}

	return (
		<>
			<Head>
				<title>My ActivibeeHive | ActiviBee</title>
			</Head>
			<Header title="My ActivibeeHive">
				<StyledToolbar $alignRight>
					<StyledButtonWithIcon
						type="button"
						$isOpen={isActivityFilterOpen}
						$isActive={isActivityFiltered}
						onClick={() => {
							setIsActivitySortOpen(false);
							setIsActivityFilterOpen(!isActivityFilterOpen);
							scrollToTop();
						}}
					>
						<StyledButtonWithIconIcon>
							<img src="/icons/filter.svg" alt="" />
						</StyledButtonWithIconIcon>
						<StyledButtonWithIconText>
							Filter
							{isActivityFiltered && <> ({sortedBookmarkedActivities.length})</>}
						</StyledButtonWithIconText>
					</StyledButtonWithIcon>
					<StyledButtonWithIcon
						type="button"
						$isOpen={isActivitySortOpen}
						$isActive={isActivitySorted}
						onClick={() => {
							setIsActivityFilterOpen(false);
							setIsActivitySortOpen(!isActivitySortOpen);
							scrollToTop();
						}}
					>
						<StyledButtonWithIconIcon>
							<img src="/icons/sort.svg" alt="" />
						</StyledButtonWithIconIcon>
						<StyledButtonWithIconText>
							{isActivitySorted
								? getActivitySortLabel(activitySortConfiguration)
								: "Sort"}
						</StyledButtonWithIconText>
					</StyledButtonWithIcon>
				</StyledToolbar>
			</Header>
			<main>
				{isActivityFilterOpen && !isActivitySortOpen && (
					<ActivityFilter
						onActivityFilterApply={handleActivityFilterApply}
						onActivityFilterReset={handleActivityFilterReset}
						heading="Filter Options"
						activityFilterConfiguration={activityFilterConfiguration}
					/>
				)}
				{isActivitySortOpen && !isActivityFilterOpen && (
					<ActivitySort
						onActivitySortApply={handleActivitySortApply}
						onActivitySortReset={handleActivitySortReset}
						activitySortConfiguration={activitySortConfiguration}
					/>
				)}
				<ActivityList
					activities={sortedBookmarkedActivities}
					noActivitiesFoundMessage="No bookmarks yet. Tap the bee on any activity to save it here."
					isActivityFiltered={isActivityFiltered}
					handleBookmarkToggle={handleBookmarkToggle}
					bookmarkedActivityIds={bookmarkedActivityIds}
				/>
			</main>
		</>
	);
}
