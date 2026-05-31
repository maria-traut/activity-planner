import useSWR from "swr";
import styled from "styled-components";
import Head from "next/head";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import {
    StyledToolbar,
    StyledToolbarWrap,
} from "@/components/Global/Global.styled";
import ActivityList from "@/components/ActivityList";

export default function Bookmarks({
    bookmarkedActivities,
    onHandleToggleBookmark,
}) {
    const {
        data: activities,
        isLoading,
        error,
        mutate,
    } = useSWR("/api/activities");

    const bookmarkedActivityData = activities?.filter((activity) =>
        bookmarkedActivities.includes(activity._id)
    );

    if (isLoading) {
        return (
            <div>
                <Head>
                    <title> Activity Planner</title>
                </Head>
                <Header />
                <main>
                    <StyledToolbarWrap>
                        <StyledToolbar>
                            <BackButton />
                        </StyledToolbar>
                    </StyledToolbarWrap>
                    <p>Loading activities...</p>
                </main>
            </div>
        );
    }

    if (!activities || error) {
        return (
            <div>
                <Head>
                    <title> Activity Planner</title>
                </Head>
                <Header />
                <main>
                    <StyledToolbarWrap>
                        <StyledToolbar>
                            <BackButton />
                        </StyledToolbar>
                    </StyledToolbarWrap>
                    <p>An error occurred while fetching the activities.</p>
                </main>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>My Bookmarks | Activity Planner</title>
            </Head>
            <Header />
            <StyledToolbarWrap>
                <StyledToolbar>
                    <BackButton />
                </StyledToolbar>
            </StyledToolbarWrap>
            {bookmarkedActivities.length > 0 ? (
                <ActivityList
                    activities={bookmarkedActivityData}
                    onHandleToggleBookmark={onHandleToggleBookmark}
                    bookmarkedActivities={bookmarkedActivities}
                />
            ) : (
                <p>Add new activities to the list to see them here.</p>
            )}
        </>
    );
}

// const StyledHeading = styled.h1`
//     font-size: 1.75rem;
//     line-height: 1.5;
//     text-align: center;
//     width: 100%;
// `;
