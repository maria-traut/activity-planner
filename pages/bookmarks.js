import { useState } from "react";
import Head from "next/head";
import useSWR from "swr";

import { scrollToTop } from "@/components/Global";
import Header from "@/components/Header";
import ActivityList from "@/components/ActivityList";
import ActivityFilter from "@/components/ActivityFilter";
import ActivitySort from "@/components/ActivitySort";

import {
    StyledButtonIcon,
    StyledButtonWithIcon,
    StyledStatusMessage,
    StyledStatusMessageWrap,
    StyledToolbar,
} from "@/components/Global/Global.styled";

import { defaultActivityFilterConfiguration } from "@/lib/activityFilter";
import {
    defaultActivitySortConfiguration,
    getActivitySortLabel,
    getSortedActivities,
} from "@/lib/activitySort";

export default function Bookmarks({
    handleBookmarkToggle,
    bookmarkedActivityIds,
    handleNavbarLocation,
}) {
    const [activityFilterConfiguration, setActivityFilterConfiguration] =
        useState(defaultActivityFilterConfiguration);

    const filterQuery = new URLSearchParams({
        ...activityFilterConfiguration,
        categories: activityFilterConfiguration?.categories.join(","),
        country: activityFilterConfiguration?.country.join(","),
    }).toString();

    const {
        data: activities,
        isLoading: activitiesLoading,
        error: activitiesError,
    } = useSWR(`/api/activities?${filterQuery}`);

    const isLoading = activitiesLoading;
    const hasError = activitiesError;

    const bookmarkedActivities = activities?.filter((activity) =>
        bookmarkedActivityIds.includes(activity._id)
    );

    const [activitySortConfiguration, setActivitySortConfiguration] = useState(
        defaultActivitySortConfiguration
    );

    const sortedBookmarkedActivities = getSortedActivities(
        bookmarkedActivities,
        activitySortConfiguration
    );

    const [isActivityFilterOpen, setIsActivityFilterOpen] = useState(false);
    const [isActivityFiltered, setIsActivityFiltered] = useState(false);

    const [isActivitySortOpen, setIsActivitySortOpen] = useState(false);
    const [isActivitySorted, setIsActivitySorted] = useState(false);

    function handleActivityFilterApply(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const filterData = {
            ...Object.fromEntries(formData),
            categories: formData.getAll("categories"),
            country: formData.getAll("country"),
        };

        setActivityFilterConfiguration({
            ...activityFilterConfiguration,
            title: filterData.title,
            categories: filterData.categories,
            country: filterData.country,
            area: filterData.area,
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

    function handleActivitySortApply(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const sortData = Object.fromEntries(formData);

        setActivitySortConfiguration(sortData.order);

        setIsActivitySortOpen(false);
        setIsActivitySorted(true);
    }

    function handleActivitySortReset(order) {
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
                        <StyledStatusMessage>
                            Loading activities...
                        </StyledStatusMessage>
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
                        <StyledStatusMessage>
                            Activities could not be loaded.
                        </StyledStatusMessage>
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
                        <StyledButtonIcon>
                            <img src="/filter.svg" alt="" />
                        </StyledButtonIcon>
                        Filter
                        {isActivityFiltered && <> ({activities.length})</>}
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
                        <StyledButtonIcon>&#8645;</StyledButtonIcon>
                        {isActivitySorted
                            ? getActivitySortLabel(activitySortConfiguration)
                            : "Sort"}
                    </StyledButtonWithIcon>
                </StyledToolbar>
            </Header>
            <main>
                {isActivityFilterOpen && !isActivitySortOpen && (
                    <ActivityFilter
                        onActivityFilterApply={handleActivityFilterApply}
                        onActivityFilterReset={handleActivityFilterReset}
                        heading="Filter Options"
                        activityFilterConfiguration={
                            activityFilterConfiguration
                        }
                    />
                )}
                {isActivitySortOpen && !isActivityFilterOpen && (
                    <ActivitySort
                        onActivitySortApply={handleActivitySortApply}
                        onActivitySortReset={handleActivitySortReset}
                        activitySortConfiguration={activitySortConfiguration}
                        isActivitySortOpen={isActivitySortOpen}
                        setIsActivitySortOpen={setIsActivitySortOpen}
                    />
                )}
                <ActivityList
                    activities={sortedBookmarkedActivities}
                    noActivitiesFoundMessage="No bookmarks yet. Tap the bee on any activity to save it here."
                    isActivityFiltered={isActivityFiltered}
                    handleBookmarkToggle={handleBookmarkToggle}
                    bookmarkedActivityIds={bookmarkedActivityIds}
                    handleNavbarLocation={handleNavbarLocation}
                />
            </main>
        </>
    );
}
