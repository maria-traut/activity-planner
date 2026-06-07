import ActivityCard from "@/components/ActivityCard";
import BookmarkButton from "../BookmarkButton";
import {
    StyledActivityList,
    StyledActivityCardContainer,
} from "./ActivityList.styled";
import {
    StyledStatusMessage,
    StyledStatusMessageWrap,
} from "../Global/Global.styled";

export default function ActivityList({
    activities,
    isActivityFiltered,
    handleNavbarLocation,
    handleBookmarkToggle,
    bookmarkedActivityIds,
    noActivitiesFoundMessage = "No activities found.",
    noFilteredActivitiesFoundMessage = "No activities found for the selected filters.",
}) {
    if (activities.length < 1 && isActivityFiltered) {
        return (
            <StyledStatusMessageWrap>
                <StyledStatusMessage>
                    {noFilteredActivitiesFoundMessage}
                </StyledStatusMessage>
            </StyledStatusMessageWrap>
        );
    }
    if (activities.length < 1) {
        return (
            <StyledStatusMessageWrap>
                <StyledStatusMessage>
                    {noActivitiesFoundMessage}
                </StyledStatusMessage>
            </StyledStatusMessageWrap>
        );
    }

    return (
        <StyledActivityList>
            {activities.map((activity) => (
                <li key={activity._id}>
                    <StyledActivityCardContainer>
                        <ActivityCard
                            image={activity.imageUrl}
                            title={activity.title}
                            categories={activity.categories}
                            id={activity._id}
                            onNavbarLocation={handleNavbarLocation}
                        />
                        <BookmarkButton
                            onBookmarkToggle={handleBookmarkToggle}
                            id={activity._id}
                            bookmarkedActivityIds={bookmarkedActivityIds}
                        />
                    </StyledActivityCardContainer>
                </li>
            ))}
        </StyledActivityList>
    );
}
