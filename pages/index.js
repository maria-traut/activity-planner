import useSWR from "swr";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ActivityForm from "@/components/ActivityForm";
import ActivityList from "@/components/ActivityList";
import { Button } from "./[id]";

export default function HomePage() {
  const [isCreateActivityMode, setIsCreateActivityMode] = useState(false);
  const {
    data: activities,
    isLoading,
    error,
    mutate,
  } = useSWR("/api/activities");
  const [activityFormStatus, setActivityFormStatus] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    const successMessageTimer = setTimeout(() => {
      if (activityFormStatus.type === "success") {
        setActivityFormStatus({
          type: "",
          message: "",
        });
        setIsCreateActivityMode(false);
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
      {!isCreateActivityMode && (
        <Button
          onClick={() => {
            setIsCreateActivityMode(!isCreateActivityMode);
            setActivityFormStatus({
              type: "",
              message: "",
            });
          }}
        >
          Create Activity
        </Button>
      )}
      {isCreateActivityMode && (
        <ActivityForm
          onSubmit={handleActivityCreate}
          status={activityFormStatus}
          heading="Add Activity"
          setIsCreateActivityMode={setIsCreateActivityMode}
          isCreateActivityMode={isCreateActivityMode}
        />
      )}
      <ActivityList activities={activities} />
    </div>
  );
}

const StyledHeading = styled.h1`
  font-size: 1.75rem;
  line-height: 1.5;
  text-align: center;
  width: 100%;
`;
