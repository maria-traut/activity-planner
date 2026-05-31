import ActivityCard from "@/components/ActivityCard";
import BookmarkButton from "../BookmarkButton";
import {
    StyledActivityList,
    StyledActivityCardContainer,
} from "./ActivityList.styled";

export default function ActivityList({ activities, onHandleToggleBookmark }) {
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
                        />
                        <BookmarkButton
                            onHandleToggleBookmark={onHandleToggleBookmark}
                            id={activity._id}
                        />
                    </StyledActivityCardContainer>
                </li>
            ))}
        </StyledActivityList>
    );
}
