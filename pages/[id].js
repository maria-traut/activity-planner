import useSWR from "swr";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styled from "styled-components";
import BackButton from "@/components/BackButton";
import ActivityInfo from "@/components/ActivityInfo";
import { FormButtonWrap } from "@/components/ActivityForm";
import ActivityForm from "@/components/ActivityForm";

export default function ActivityDetails() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: activity,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/activities/${id}`);
  const [isEditActivityMode, setIsEditActivityMode] = useState(false);
  const [activityFormStatus, setActivityFormStatus] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activityFormStatus.type === "success") {
        setActivityFormStatus({
          type: "",
          message: "",
        });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [activityFormStatus]);

  async function handleActivityEdit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const activityData = {
      ...Object.fromEntries(formData),
      categories: formData.getAll("categories"),
    };
    console.log("handleActivityEdit", formData, activityData);

    const response = await fetch(`/api/activities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    });

    if (response.ok) {
      mutate();
      setIsEditActivityMode(!isEditActivityMode);
    }

    /*

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
    */
  }

  if (isLoading)
    return (
      <div>
        <p>Loading activity...</p>
      </div>
    );

  if (!activity || error)
    return (
      <div>
        <p>
          Sorry, we could not load this item. <br />
          Please try again later
        </p>
      </div>
    );

  return (
    <div>
      <BackButton />
      <FormButtonWrap>
        {!isEditActivityMode && (
          <Button onClick={() => setIsEditActivityMode(!isEditActivityMode)}>
            Edit
          </Button>
        )}
      </FormButtonWrap>
      {isEditActivityMode && (
        <ActivityForm
          activity={activity}
          onSubmit={handleActivityEdit}
          status={activityFormStatus}
          heading="Edit Activity"
          setIsEditActivityMode={setIsEditActivityMode}
          isEditActivityMode={isEditActivityMode}
        />
      )}
      <ActivityInfo activity={activity} />
    </div>
  );
}

export const Button = styled.button`
  all: unset;
  border-radius: 10px;
  color: black;
  border: 1px solid black;
  background: white;
  padding: 0.5em 1em;
`;
