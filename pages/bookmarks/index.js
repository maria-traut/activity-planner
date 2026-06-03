import useSWR from "swr";
import Head from "next/head";
import Header from "@/components/Header";
import {
    StyledToolbar,
    StyledToolbarWrap,
} from "@/components/Global/Global.styled";
import ActivityList from "@/components/ActivityList";

export default function Bookmarks({
    handleBookmarkToggle,
    bookmarkedActivityIds,
    handleNavbarLocation,
}) {
    const { data: activities, isLoading, error } = useSWR("/api/activities");

    const bookmarkedActivities = activities?.filter((activity) =>
        bookmarkedActivityIds.includes(activity._id)
    );

    if (isLoading) {
        return (
            <div>
                <Head>
                    <title> Activity Planner</title>
                </Head>
                <Header title="Bookmarks" />
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
                <Header title="Bookmarks" />
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
            <Header title="Bookmarks" />
            <main>
                <StyledToolbarWrap>
                    <StyledToolbar></StyledToolbar>
                </StyledToolbarWrap>
                {bookmarkedActivities.length > 0 ? (
                    <ActivityList
                        activities={bookmarkedActivities}
                        handleBookmarkToggle={handleBookmarkToggle}
                        bookmarkedActivityIds={bookmarkedActivityIds}
                        handleNavbarLocation={handleNavbarLocation}
                    />
                ) : (
                    <p>
                        No bookmarks yet. Tap the bee on any activity to save it
                        here.
                    </p>
                )}
            </main>
        </>
    );
}
