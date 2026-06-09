import { useState, useEffect } from "react";
import Head from "next/head";
import useSWR from "swr";

import { scrollToTop } from "@/components/Global";
import Header from "@/components/Header";
import ActivityForm from "@/components/ActivityForm";
import ActivityList from "@/components/ActivityList";
import ActivityFilter from "@/components/ActivityFilter";
import ActivitySort from "@/components/ActivitySort";
import BackToTopButton from "@/components/buttons/BackToTopButton";
import showToast from "@/components/Toast";
import CreateButton from "@/components/buttons/CreateButton";

import {
    StyledButtonWithIcon,
    StyledButtonWithIconIcon,
    StyledButtonWithIconText,
    StyledStatusMessageWrap,
    StyledToolbar,
    StyledStatusMessage,
    StyledTopAndCreateButtonContainer,
} from "@/components/Global/Global.styled";

import { defaultActivityFilterConfiguration } from "@/lib/activityFilter";
import {
    defaultActivitySortConfiguration,
    getActivitySortLabel,
    getSortedActivities,
} from "@/lib/activitySort";

export default function HomePage({
    onNavbarLocation,
    navbarLocation,
    handleBookmarkToggle,
    bookmarkedActivityIds,
    isCreateActivityMode,
    setIsCreateActivityMode,
    activityFormStatus,
    setActivityFormStatus,
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
        mutate: activitiesMutate,
    } = useSWR(`/api/activities?${filterQuery}`);

    const isLoading = activitiesLoading;
    const hasError = activitiesError;

    const [activitySortConfiguration, setActivitySortConfiguration] = useState(
        defaultActivitySortConfiguration
    );

    const sortedActivities = getSortedActivities(
        activities,
        activitySortConfiguration
    );

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
                showToast(activityFormStatus.message, "error");
                setActivityFormStatus({ type: "", message: "" });
            }
        }, 500);

        return () => clearTimeout(formClosingTimer);
    }, [activityFormStatus]);

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

    async function handleActivityCreate(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

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
                event.target.reset();
                setActivityFormStatus({
                    type: "success",
                    message: data?.status,
                });
            } else {
                setActivityFormStatus({
                    type: "error",
                    message:
                        data?.status ||
                        "The form submission has failed, please try again.",
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
                    <title>Home | ActiviBee</title>
                </Head>
                <Header />
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
                            <img src="/icons/filter.svg" alt="" />
                        </StyledButtonWithIconIcon>
                        <StyledButtonWithIconText>
                            Filter
                            {isActivityFiltered && <> ({activities.length})</>}
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
                    activities={sortedActivities}
                    isActivityFiltered={isActivityFiltered}
                    handleNavbarLocation={onNavbarLocation}
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
