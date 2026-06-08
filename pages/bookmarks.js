import { useState, useEffect } from "react";
import Head from "next/head";
import useSWR from "swr";

import { scrollToTop } from "@/components/Global";
import Header from "@/components/Header";
import ActivityList from "@/components/ActivityList";
import ActivityFilter from "@/components/ActivityFilter";
import ActivitySort from "@/components/ActivitySort";

import {
    StyledButtonWithIcon,
    StyledButtonWithIconIcon,
    StyledButtonWithIconText,
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
    onNavbarLocation,
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

    useEffect(() => {
        onNavbarLocation(`/bookmarks`);
    });

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
                        <StyledButtonWithIconIcon>
                            <img src="/icons/filter.svg" alt="" />
                        </StyledButtonWithIconIcon>
                        <StyledButtonWithIconText>
                            Filter
                            {isActivityFiltered && (
                                <> ({bookmarkedActivities.length})</>
                            )}
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
                                ? getActivitySortLabel(
                                      activitySortConfiguration
                                  )
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
                    />
                )}
                <ActivityList
                    activities={sortedBookmarkedActivities}
                    noActivitiesFoundMessage="No bookmarks yet. Tap the bee on any activity to save it here."
                    isActivityFiltered={isActivityFiltered}
                    handleBookmarkToggle={handleBookmarkToggle}
                    bookmarkedActivityIds={bookmarkedActivityIds}
                    handleNavbarLocation={onNavbarLocation}
                />
            </main>
        </>
    );
}
