import ActivityCard from "@/components/ActivityCard";
import { StyledActivityList } from "./ActivityList.styled";

export default function ActivityList({ activities }) {
    return (
        <StyledActivityList>
            {activities.map((activity) => (
                <li key={activity._id}>
                    <ActivityCard
                        image={activity.imageUrl}
                        title={activity.title}
                        categories={activity.categories}
                        id={activity._id}
                    />
                </li>
            ))}
        </StyledActivityList>
    );
}
