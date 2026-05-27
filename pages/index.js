import useSWR from "swr";
import ActivityList from "@/components/ActivityList";
import styled from "styled-components";

export default function HomePage() {
  const { data, isLoading, error } = useSWR("/api/activities");

  if (isLoading)
    return (
      <div>
        <StyledHeading>Activity Planner</StyledHeading>
        <p>Loading activities...</p>
      </div>
    );

  if (!data || error)
    return (
      <div>
        <StyledHeading>Activity Planner</StyledHeading>
        <p>An error occured while fetching the activities.</p>
      </div>
    );

  return (
    <div>
      <StyledHeading>Activity Planner</StyledHeading>
      <ActivityList activities={data} />
    </div>
  );
}

const StyledHeading = styled.h1`
  font-size: 1.75rem;
  line-height: 1.5;
  text-align: center;
  width: 100%;
`;
