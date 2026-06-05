import useSWR from "swr";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ActivityDetail from "@/components/ActivityDetail";
import ActivityForm from "@/components/ActivityForm";
import Head from "next/head";
import {
    StyledButton,
    StyledButtonRed,
    StyledToolbar,
    StyledToolbarWrap,
    StyledStatusMessageWrap,
} from "@/components/Global/Global.styled";
import Header from "@/components/Header";
import showToast from "@/components/Toast";

export default function Activity({
    handleBookmarkToggle,
    bookmarkedActivityIds,
    onBookmarkedActivityIdsDelete,
}) {
    const router = useRouter();
    const { id } = router.query;

    const {
        data: activity,
        isLoading,
        error,
        mutate,
    } = useSWR(`/api/activities/${id}`);

    const [isEditActivityMode, setIsEditActivityMode] = useState(false);
    const [isDeleteActivityMode, setIsDeleteActivityMode] = useState(false);
    const [activityFormStatus, setActivityFormStatus] = useState({
        type: "",
        message: "",
    });

    useEffect(() => {
        const formCLosingTimer = setTimeout(() => {
            if (activityFormStatus.type === "success") {
                showToast(activityFormStatus.message);
                setActivityFormStatus({
                    type: "",
                    message: "",
                });
                setIsEditActivityMode(false);
                if (isDeleteActivityMode) {
                    setIsDeleteActivityMode(false);
                    router.push("/");
                }
            }
        }, 500);

        return () => clearTimeout(formCLosingTimer);
    }, [activityFormStatus]);

    async function handleActivityEdit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const activityData = {
            ...Object.fromEntries(formData),
            categories: formData.getAll("categories"),
        };

        const response = await fetch(`/api/activities/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(activityData),
        });

        const data = await response.json();

        if (response.ok) {
            mutate();
            setActivityFormStatus({
                type: "success",
                message: data?.status,
            });
        } else {
            setActivityFormStatus({
                type: "error",
                message:
                    data?.status ||
                    "The form submission has failed, <br /> Please try again.",
            });
        }
    }

    async function handleActivityDelete() {
        const response = await fetch(`/api/activities/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        if (response.ok) {
            setActivityFormStatus({
                type: "success",
                message: data?.status,
            });
            onBookmarkedActivityIdsDelete(id);
        } else {
            setActivityFormStatus({
                type: "error",
                message:
                    "The activity could not be deleted, <br /> Please try again.",
            });
        }
    }

    if (isLoading) {
        return (
            <>
                <Head>
                    <title>{activity?.title} | Activity Planner</title>
                </Head>
                <Header />
                <main>
                    <StyledStatusMessageWrap>
                        <p>Loading activity...</p>
                    </StyledStatusMessageWrap>
                </main>
            </>
        );
    }

    if (!activity || error) {
        return (
            <>
                <Head>
                    <title>{activity?.title} | Activity Planner</title>
                </Head>
                <Header />
                <main>
                    <StyledStatusMessageWrap>
                        <p>
                            Sorry, we could not load this item. <br />
                            Please try again later
                        </p>
                    </StyledStatusMessageWrap>
                </main>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{activity?.title} | Activity Planner</title>
            </Head>
            <Header title={activity.title} />
            <main>
                <StyledToolbarWrap>
                    <StyledToolbar>
                        {!isEditActivityMode && !isDeleteActivityMode && (
                            <StyledButton
                                onClick={() => {
                                    setIsEditActivityMode(!isEditActivityMode);
                                    setActivityFormStatus({
                                        type: "",
                                        message: "",
                                    });
                                }}
                            >
                                Edit
                            </StyledButton>
                        )}
                        {!isDeleteActivityMode && !isEditActivityMode && (
                            <StyledButtonRed
                                type="button"
                                aria-label="delete button"
                                onClick={() => {
                                    setIsDeleteActivityMode(
                                        !isDeleteActivityMode
                                    );
                                    setActivityFormStatus({
                                        type: "",
                                        message: "",
                                    });
                                }}
                            >
                                Delete
                            </StyledButtonRed>
                        )}
                        {isDeleteActivityMode && (
                            <>
                                {activityFormStatus.type !== "success" && (
                                    <>
                                        <span>Delete?</span>
                                        <StyledButtonRed
                                            type="button"
                                            aria-label="confirm button"
                                            onClick={handleActivityDelete}
                                        >
                                            Confirm
                                        </StyledButtonRed>
                                        <StyledButton
                                            type="button"
                                            onClick={() =>
                                                setIsDeleteActivityMode(
                                                    !isDeleteActivityMode
                                                )
                                            }
                                        >
                                            Cancel
                                        </StyledButton>
                                    </>
                                )}
                                {activityFormStatus.type === "success" && (
                                    <>
                                        <StyledButton type="button" disabled>
                                            Confirm
                                        </StyledButton>
                                        <StyledButton type="button" disabled>
                                            Cancel
                                        </StyledButton>
                                    </>
                                )}
                            </>
                        )}
                    </StyledToolbar>
                </StyledToolbarWrap>

                {isEditActivityMode && (
                    <ActivityForm
                        activity={activity}
                        onSubmit={handleActivityEdit}
                        status={activityFormStatus}
                        heading="Edit Activity"
                        setIsEditActivityMode={setIsEditActivityMode}
                        isEditActivityMode={isEditActivityMode}
                    />
                )}
                <ActivityDetail
                    activity={activity}
                    handleBookmarkToggle={handleBookmarkToggle}
                    bookmarkedActivityIds={bookmarkedActivityIds}
                />
            </main>
        </>
    );
}
