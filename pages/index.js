import useSWR from "swr";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ActivityForm from "@/components/ActivityForm";
import ActivityList from "@/components/ActivityList";
import SortButton from "@/components/SortButton";

export default function HomePage() {
  const {
    data: activities,
    isLoading,
    error,
    mutate,
  } = useSWR("/api/activities");

  console.log("activities with timestamp", activities);

  const [activityFormStatus, setActivityFormStatus] = useState({
    type: "",
    message: "",
  });

  const [activitySortOrder, setActivitySortOrder] = useState("newest");

  const sortedByDateActivities = activities
    ? [...activities].sort((a, b) => {
        if (activitySortOrder === "newest") {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        } else {
          return (
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        }
      })
    : [];

  function handleActivityDateSort(order) {
    setActivitySortOrder(order);
  }

  useEffect(() => {
    const successMessageTimer = setTimeout(() => {
      if (activityFormStatus.type === "success") {
        setActivityFormStatus({
          type: "",
          message: "",
        });
      }
    }, 3000);

    return () => clearTimeout(successMessageTimer);
  }, [activityFormStatus]);

  async function handleActivityCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const activityData = {
      ...Object.fromEntries(formData),
      categories: formData.getAll("categories"),
    };

    const response = await fetch(`/api/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    });

    if (response.ok) {
      mutate();
      event.target.reset();
      setActivityFormStatus({
        type: "success",
        message: "Activity has successfully been created!",
      });
    } else {
      setActivityFormStatus({
        type: "error",
        message: "Form could not be sent. Please try again.",
      });
    }
  }

  if (isLoading) {
    return (
      <div>
        <StyledHeading>Activity Planner</StyledHeading>
        <p>Loading activities...</p>
      </div>
    );
  }

  if (!activities || error) {
    return (
      <div>
        <StyledHeading>Activity Planner</StyledHeading>
        <p>An error occured while fetching the activities.</p>
      </div>
    );
  }

  return (
    <div>
      <StyledHeading>Activity Planner</StyledHeading>
      <ActivityForm
        onSubmit={handleActivityCreate}
        status={activityFormStatus}
        heading="Add Activity"
      />
      <SortButton
        onActivityDateSort={handleActivityDateSort}
        activitySortOrder={activitySortOrder}
      />
      <ActivityList activities={sortedByDateActivities} />
    </div>
  );
}

const StyledHeading = styled.h1`
  font-size: 1.75rem;
  line-height: 1.5;
  text-align: center;
  width: 100%;
`;
