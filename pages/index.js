import useSWR from "swr";
import { useState, useEffect } from "react";
import ActivityForm from "@/components/ActivityForm";
import ActivityList from "@/components/ActivityList";
import SortButton from "@/components/SortButton";
import Head from "next/head";
import Header from "@/components/Header";
import { StyledStatusMessageWrap } from "@/components/Global/Global.styled";

export default function HomePage({
    handleNavbarLocation,
    handleBookmarkToggle,
    bookmarkedActivityIds,
    isCreateActivityMode,
    setIsCreateActivityMode,
    activityFormStatus,
    setActivityFormStatus,
}) {
    const {
        data: activities,
        isLoading,
        error,
        mutate,
    } = useSWR("/api/activities");

    const [activitySortOrder, setActivitySortOrder] = useState(null);

    const sortedActivities = activities
        ? [...activities].sort((a, b) => {
              if (activitySortOrder === "az") {
                  if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
                  if (a.title.toUpperCase() < b.title.toUpperCase()) return -1;
                  return 0;
              }
              if (activitySortOrder === "za") {
                  if (b.title.toUpperCase() > a.title.toUpperCase()) return 1;
                  if (b.title.toUpperCase() < a.title.toUpperCase()) return -1;
                  return 0;
              }
              if (activitySortOrder === "lastModified") {
                  return (
                      new Date(b.updatedAt).getTime() -
                      new Date(a.updatedAt).getTime()
                  );
              }
              if (activitySortOrder === "newest") {
                  return (
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  );
              }
              if (activitySortOrder === "oldest") {
                  return (
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime()
                  );
              }
              return 0;
          })
        : [];

    useEffect(() => {
        const successMessageTimer = setTimeout(() => {
            if (activityFormStatus.type === "success") {
                setActivityFormStatus({
                    type: "",
                    message: "",
                });
                setIsCreateActivityMode(false);
            }
        }, 3000);

        return () => clearTimeout(successMessageTimer);
    }, [activityFormStatus]);

    function handleActivitySort(order) {
        setActivitySortOrder(order);
    }

    async function handleActivityCreate(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const activityData = {
            ...Object.fromEntries(formData),
            categories: formData.getAll("categories"),
        };

        const response = await fetch(`/api/activities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(activityData),
        });

        const data = await response.json();

        if (response.ok) {
            mutate();
            event.target.reset();
            setActivityFormStatus({
                type: "success",
                message: data?.status,
            });
        } else {
            setActivityFormStatus({
                type: "error",
                message:
                    data?.status || "Form could not be sent. Please try again.",
            });
        }
    }

    if (isLoading) {
        return (
            <>
                <Head>
                    <title>Home | Activity Planner</title>
                </Head>
                <Header />
                <main>
                    <StyledStatusMessageWrap>
                        <p>Loading activities...</p>
                    </StyledStatusMessageWrap>
                </main>
            </>
        );
    }

    if (!activities || error) {
        return (
            <>
                <Head>
                    <title>Home | Activity Planner</title>
                </Head>
                <Header />
                <main>
                    <StyledStatusMessageWrap>
                        <p>An error occured while fetching the activities.</p>
                    </StyledStatusMessageWrap>
                </main>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Home | Activity Planner</title>
            </Head>
            <Header />
            <main>
                {isCreateActivityMode && (
                    <ActivityForm
                        onSubmit={handleActivityCreate}
                        status={activityFormStatus}
                        heading="Add Activity"
                        setIsCreateActivityMode={setIsCreateActivityMode}
                        isCreateActivityMode={isCreateActivityMode}
                    />
                )}
                <SortButton
                    onActivitySort={handleActivitySort}
                    activitySortOrder={activitySortOrder}
                />
                <ActivityList
                    activities={sortedActivities}
                    handleNavbarLocation={handleNavbarLocation}
                    handleBookmarkToggle={handleBookmarkToggle}
                    bookmarkedActivityIds={bookmarkedActivityIds}
                />
            </main>
        </>
    );
}
