import useSWR from "swr";
import { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import {
    StyledToolbar,
    StyledToolbarWrap,
} from "@/components/Global/Global.styled";
import ActivityList from "@/components/ActivityList";
import SortButton from "@/components/SortButton";

export default function Bookmarks({
    handleBookmarkToggle,
    bookmarkedActivityIds,
    handleNavbarLocation,
}) {
    const { data: activities, isLoading, error } = useSWR("/api/activities");

    const bookmarkedActivities = activities?.filter((activity) =>
        bookmarkedActivityIds.includes(activity._id)
    );

    const [activitySortOrder, setActivitySortOrder] = useState(null);

    const sortedBookmarkedActivities = bookmarkedActivities
        ? [...bookmarkedActivities].sort((a, b) => {
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

    function handleActivitySort(order) {
        setActivitySortOrder(order);
    }

    if (isLoading) {
        return (
            <div>
                <Head>
                    <title> Activity Planner</title>
                </Head>
                <Header title="Bookmarks" />
                <main>
                    <StyledToolbarWrap>
                        <StyledToolbar />
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
                        <StyledToolbar />
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
            <Header title="My ActivibeeHive" />
            <main>
                {bookmarkedActivities.length > 0 ? (
                    <>
                        <SortButton
                            onActivitySort={handleActivitySort}
                            activitySortOrder={activitySortOrder}
                        />
                        <ActivityList
                            activities={sortedBookmarkedActivities}
                            handleBookmarkToggle={handleBookmarkToggle}
                            bookmarkedActivityIds={bookmarkedActivityIds}
                            handleNavbarLocation={handleNavbarLocation}
                        />
                    </>
                ) : (
                    <>
                        <StyledToolbarWrap>
                            <StyledToolbar />
                        </StyledToolbarWrap>
                        <p>
                            No bookmarks yet. Tap the bee on any activity to
                            save it here.
                        </p>
                    </>
                )}
            </main>
        </>
    );
}
