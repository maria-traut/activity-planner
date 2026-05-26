import ActivityCard from "components/ActivityCard";
import styled from "styled-components";

export default function ActivityList({ activities }) {
  return (
    <StyledActivityList>
      {activities.map((activity) => (
        <li key={activity._id}>
          <ActivityCard
            // for later instead of placeholder
            // src={activity.imageUrl}
            title={activity.title}
            categories={activity.categories}
            id={activity._id}
          />
        </li>
      ))}
    </StyledActivityList>
  );
}

const StyledActivityList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 0;
`;
