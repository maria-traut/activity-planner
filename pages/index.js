import useSWR from "swr";
import { useState, useEffect } from "react";
import ActivityForm from "@/components/ActivityForm";
import ActivityList from "@/components/ActivityList";
import Head from "next/head";
import Header from "@/components/Header";
import {
    StyledButton,
    StyledToolbarWrap,
    StyledToolbar,
    StyledStatusMessageWrap,
} from "@/components/Global/Global.styled";

export default function HomePage({
    handleBookmarkToggle,
    bookmarkedActivities,
}) {
    const [isCreateActivityMode, setIsCreateActivityMode] = useState(false);
    const {
        data: activities,
        isLoading,
        error,
        mutate,
    } = useSWR("/api/activities");
    const [activityFormStatus, setActivityFormStatus] = useState({
        type: "",
        message: "",
    });

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

        if (response.ok) {
            mutate();
            event.target.reset();
            setActivityFormStatus({
                type: "success",
                message: "Activity has successfully been created!",
            });
        } else {
            setActivityFormStatus({
                type: "error",
                message: "Form could not be sent. Please try again.",
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
                {!isCreateActivityMode && (
                    <StyledToolbarWrap>
                        <StyledToolbar>
                            <StyledButton
                                onClick={() => {
                                    setIsCreateActivityMode(
                                        !isCreateActivityMode
                                    );
                                    setActivityFormStatus({
                                        type: "",
                                        message: "",
                                    });
                                }}
                            >
                                Create Activity
                            </StyledButton>
                        </StyledToolbar>
                    </StyledToolbarWrap>
                )}
                {isCreateActivityMode && (
                    <ActivityForm
                        onSubmit={handleActivityCreate}
                        status={activityFormStatus}
                        heading="Add Activity"
                        setIsCreateActivityMode={setIsCreateActivityMode}
                        isCreateActivityMode={isCreateActivityMode}
                    />
                )}
                <ActivityList
                    activities={activities}
                    handleBookmarkToggle={handleBookmarkToggle}
                    bookmarkedActivities={bookmarkedActivities}
                />
            </main>
        </>
    );
}
