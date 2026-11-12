import Head from "next/head";
import Image from "next/image";
import { type FormEvent, useEffect, useState } from "react";
import useSWR from "swr";

import ActivityFilter from "@/components/ActivityFilter";
import ActivityForm from "@/components/ActivityForm";
import ActivityList from "@/components/ActivityList";
import ActivitySort from "@/components/ActivitySort";
import BackToTopButton from "@/components/buttons/BackToTopButton";
import CreateButton from "@/components/buttons/CreateButton";
import { scrollToTop } from "@/components/Global";
import {
	StyledButtonWithIcon,
	StyledButtonWithIconIcon,
	StyledButtonWithIconText,
	StyledStatusMessage,
	StyledStatusMessageWrap,
	StyledToolbar,
	StyledTopAndCreateButtonContainer,
} from "@/components/Global/Global.styled";
import Header from "@/components/Header";
import showToast from "@/components/Toast";
import { defaultActivityFilterConfiguration } from "@/lib/activityFilter";
import {
	type ActivitySortOrder,
	defaultActivitySortConfiguration,
	getActivitySortLabel,
	getSortedActivities,
} from "@/lib/activitySort";
import type { Activity, AppPageProps } from "@/types";

export default function HomePage({
	onNavbarLocation,
	navbarLocation,
	handleBookmarkToggle,
	bookmarkedActivityIds,
	isCreateActivityMode,
	setIsCreateActivityMode,
	activityFormStatus,
	setActivityFormStatus,
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
		mutate: activitiesMutate,
	} = useSWR<Activity[]>(`/api/activities?${filterQuery}`);

	const isLoading = activitiesLoading;
	const hasError = activitiesError;

	const [activitySortConfiguration, setActivitySortConfiguration] = useState<ActivitySortOrder>(
		defaultActivitySortConfiguration,
	);

	const sortedActivities = getSortedActivities(activities, activitySortConfiguration);

	const [isActivityFilterOpen, setIsActivityFilterOpen] = useState(false);
	const [isActivityFiltered, setIsActivityFiltered] = useState(false);

	const [isActivitySortOpen, setIsActivitySortOpen] = useState(false);
	const [isActivitySorted, setIsActivitySorted] = useState(false);
	useEffect(() => {
		onNavbarLocation(`/`);
	});
	useEffect(() => {
		const formClosingTimer = setTimeout(() => {
			if (activityFormStatus.type === "success") {
				showToast(activityFormStatus.message);
				setActivityFormStatus({
					type: "",
					message: "",
				});
				setIsCreateActivityMode(false);
			} else if (activityFormStatus.type === "error") {
				showToast(activityFormStatus.message, "danger");
				setActivityFormStatus({ type: "", message: "" });
			}
		}, 500);

		return () => clearTimeout(formClosingTimer);
	}, [activityFormStatus, setActivityFormStatus, setIsCreateActivityMode]);

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

	async function handleActivityCreate(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);

		const addToBookmarks = formData.has("addToBookmarks");
		formData.delete("addToBookmarks");

		const activityData = {
			...Object.fromEntries(formData),
			categories: formData.getAll("categories"),
		};

		try {
			const response = await fetch(`/api/activities`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(activityData),
			});

			const data = await response.json();

			if (response.ok) {
				if (addToBookmarks && data?._id) {
					handleBookmarkToggle(data._id);
				}

				activitiesMutate();
				form.reset();
				setActivityFormStatus({
					type: "success",
					message: data?.status,
				});
			} else {
				setActivityFormStatus({
					type: "error",
					message: data?.status || "The form submission has failed, please try again.",
				});
			}
		} catch {
			setActivityFormStatus({
				type: "error",
				message: "Something went wrong. Please try again.",
			});
		}
	}

	if (isLoading) {
		return (
			<>
				<Head>
					<title>Home | ActiviBee</title>
				</Head>
				<Header />
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
					<title>Home | ActiviBee</title>
				</Head>
				<Header />
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
				<title>Home | ActiviBee</title>
			</Head>
			<Header>
				<StyledToolbar $alignRight>
					<StyledButtonWithIcon
						type="button"
						$isOpen={isActivityFilterOpen}
						$isActive={isActivityFiltered}
						onClick={() => {
							setIsActivitySortOpen(false);
							setIsCreateActivityMode(false);
							setIsActivityFilterOpen(!isActivityFilterOpen);
							scrollToTop();
						}}
					>
						<StyledButtonWithIconIcon>
							<Image src="/icons/filter.svg" alt="" width={24} height={24} />
						</StyledButtonWithIconIcon>
						<StyledButtonWithIconText>
							Filter
							{isActivityFiltered && <> ({sortedActivities.length})</>}
						</StyledButtonWithIconText>
					</StyledButtonWithIcon>
					<StyledButtonWithIcon
						type="button"
						$isOpen={isActivitySortOpen}
						$isActive={isActivitySorted}
						onClick={() => {
							setIsActivityFilterOpen(false);
							setIsCreateActivityMode(false);
							setIsActivitySortOpen(!isActivitySortOpen);
							scrollToTop();
						}}
					>
						<StyledButtonWithIconIcon>
							<Image src="/icons/sort.svg" alt="" width={24} height={24} />
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
				{isCreateActivityMode && (
					<ActivityForm
						onSubmit={handleActivityCreate}
						status={activityFormStatus}
						heading="Create Activity"
						submitLabel="Create"
						setStatus={setActivityFormStatus}
						isCreateActivityMode={isCreateActivityMode}
						setIsCreateActivityMode={setIsCreateActivityMode}
					/>
				)}
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
					activities={sortedActivities}
					isActivityFiltered={isActivityFiltered}
					handleBookmarkToggle={handleBookmarkToggle}
					bookmarkedActivityIds={bookmarkedActivityIds}
				/>
				<StyledTopAndCreateButtonContainer>
					<BackToTopButton />
					<CreateButton
						navbarLocation={navbarLocation}
						isCreateActivityMode={isCreateActivityMode}
						setIsCreateActivityMode={setIsCreateActivityMode}
						setActivityFormStatus={setActivityFormStatus}
					/>
				</StyledTopAndCreateButtonContainer>
			</main>
		</>
	);
}
