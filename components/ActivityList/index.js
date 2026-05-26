import ActivityCard from "components/ActivityCard";
import styled from "styled-components";

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

const StyledActivityList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 0;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
