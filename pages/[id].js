import useSWR from "swr";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import ActivityDetail from "@/components/ActivityDetail";
import ActivityForm from "@/components/ActivityForm";
import Head from "next/head";
import {
    StyledFormError,
    StyledFormSuccess,
    StyledTextError,
    StyledTextSuccess,
    StyledFormSection,
} from "@/components/ActivityForm/ActivityForm.styled";
import {
    StyledBaseButton,
    StyledButton,
    StyledConfirmButton,
    StyledDeleteButton,
    StyledToolbarWrap,
} from "@/components/Global/Global.styled";
import Header from "@/components/Header";

export default function Activity() {
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
        const successMessageTimer = setTimeout(() => {
            if (activityFormStatus.type === "success") {
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
        }, 3000);

        return () => clearTimeout(successMessageTimer);
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

        if (response.ok) {
            mutate();
            setActivityFormStatus({
                type: "success",
                message: "Activity has successfully been edited!",
            });
        } else {
            setActivityFormStatus({
                type: "error",
                message: "Form could not be sent. Please try again.",
            });
        }
    }

    async function handleActivityDelete() {
        const response = await fetch(`api/activities/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setActivityFormStatus({
                type: "success",
                message: "Activity has successfully been deleted!",
            });
        } else {
            setActivityFormStatus({
                type: "error",
                message: "Activity could not be deleted. Please try again.",
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
                    <p>Loading activity...</p>
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
                    <p>
                        Sorry, we could not load this item. <br />
                        Please try again later
                    </p>
                </main>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{activity?.title} | Activity Planner</title>
            </Head>
            <Header />
            <main>
                <StyledToolbarWrap>
                    <BackButton />
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
                        <StyledDeleteButton
                            type="button"
                            aria-label="delete button"
                            onClick={() => {
                                setIsDeleteActivityMode(!isDeleteActivityMode);
                                setActivityFormStatus({
                                    type: "",
                                    message: "",
                                });
                            }}
                        >
                            Delete
                        </StyledDeleteButton>
                    )}
                    {isDeleteActivityMode && (
                        <>
                            {activityFormStatus.type !== "success" && (
                                <>
                                    <span>Delete?</span>
                                    <StyledConfirmButton
                                        type="button"
                                        aria-label="confirm button"
                                        onClick={handleActivityDelete}
                                    >
                                        Confirm
                                    </StyledConfirmButton>
                                    <StyledBaseButton
                                        type="button"
                                        onClick={() =>
                                            setIsDeleteActivityMode(
                                                !isDeleteActivityMode
                                            )
                                        }
                                    >
                                        Cancel
                                    </StyledBaseButton>
                                </>
                            )}
                            {activityFormStatus.type === "success" && (
                                <>
                                    <StyledBaseButton type="button" disabled>
                                        Confirm
                                    </StyledBaseButton>
                                    <StyledBaseButton type="button" disabled>
                                        Cancel
                                    </StyledBaseButton>
                                </>
                            )}
                            {activityFormStatus.type === "error" && (
                                <StyledFormError>Error</StyledFormError>
                            )}
                            {activityFormStatus.type === "success" && (
                                <StyledFormSuccess>Success!</StyledFormSuccess>
                            )}
                        </>
                    )}
                </StyledToolbarWrap>
                {activityFormStatus.type !== "" && (
                    <StyledFormSection>
                        {activityFormStatus.type === "error" && (
                            <StyledTextError>
                                {activityFormStatus.message}
                            </StyledTextError>
                        )}
                        {activityFormStatus.type === "success" && (
                            <StyledTextSuccess>
                                {activityFormStatus.message}
                            </StyledTextSuccess>
                        )}
                    </StyledFormSection>
                )}
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
                <ActivityDetail activity={activity} />
            </main>
        </>
    );
}
