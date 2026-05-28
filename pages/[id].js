import useSWR from "swr";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styled from "styled-components";
import BackButton from "@/components/BackButton";
import ActivityInfo from "@/components/ActivityInfo";
import { FormButtonWrap } from "@/components/ActivityForm";
import ActivityForm from "@/components/ActivityForm";
import {
  FormError,
  FormSuccess,
  TextError,
  TextSuccess,
  FormSection,
} from "@/components/ActivityForm";

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
  const [isDeleteActivityMode, setIsDeleteActivityMode] = useState(false);
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
        setIsEditActivityMode(false);
        if (isDeleteActivityMode) {
          setIsDeleteActivityMode(false);
          router.push("/");
        }
      }
    }, 3000);

    return () => clearTimeout(successMessageTimer);
  }, [activityFormStatus]);

  async function handleActivityEdit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const activityData = {
      ...Object.fromEntries(formData),
      categories: formData.getAll("categories"),
    };

    const response = await fetch(`/api/activities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    });

    if (response.ok) {
      mutate();
      setActivityFormStatus({
        type: "success",
        message: "Activity has successfully been edited!",
      });
    } else {
      setActivityFormStatus({
        type: "error",
        message: "Form could not be sent. Please try again.",
      });
    }
  }

  async function handleActivityDelete() {
    const response = await fetch(`api/activities/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setActivityFormStatus({
        type: "success",
        message: "Activity has successfully been deleted!",
      });
    } else {
      setActivityFormStatus({
        type: "error",
        message: "Activity could not be deleted. Please try again.",
      });
    }
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
        {!isEditActivityMode && !isDeleteActivityMode && (
          <Button
            onClick={() => {
              setIsEditActivityMode(!isEditActivityMode);
              setActivityFormStatus({
                type: "",
                message: "",
              });
            }}
          >
            Edit
          </Button>
        )}
        {!isDeleteActivityMode && !isEditActivityMode && (
          <StyledDeleteButton
            type="button"
            aria-label="delete button"
            onClick={() => {
              setIsDeleteActivityMode(!isDeleteActivityMode);
              setActivityFormStatus({
                type: "",
                message: "",
              });
            }}
          >
            Delete
          </StyledDeleteButton>
        )}
        {isDeleteActivityMode && (
          <>
            {activityFormStatus.type !== "success" && (
              <>
                <span>Delete?</span>
                <StyledConfirmButton
                  type="button"
                  aria-label="confirm button"
                  onClick={handleActivityDelete}
                >
                  Confirm
                </StyledConfirmButton>
              </>
            )}
            {activityFormStatus.type === "success" && (
              <StyledBaseButton type="button" disabled>
                Confirm
              </StyledBaseButton>
            )}
            <StyledBaseButton
              type="button"
              onClick={() => setIsDeleteActivityMode(!isDeleteActivityMode)}
            >
              Cancel
            </StyledBaseButton>
            {activityFormStatus.type === "error" && (
              <FormError>Error</FormError>
            )}
            {activityFormStatus.type === "success" && (
              <FormSuccess>Success!</FormSuccess>
            )}
          </>
        )}
      </FormButtonWrap>
      {activityFormStatus.type !== "" && (
        <FormSection>
          {activityFormStatus.type === "error" && (
            <TextError>{activityFormStatus.message}</TextError>
          )}
          {activityFormStatus.type === "success" && (
            <TextSuccess>{activityFormStatus.message}</TextSuccess>
          )}
        </FormSection>
      )}
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

const StyledBaseButton = styled.button`
  all: unset;
  border-radius: 10px;
  border: 1px solid black;
  background: white;
  padding: 0.5em 1em;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;

const StyledDeleteButton = styled(StyledBaseButton)`
  color: red;
  border-color: red;
`;

const StyledConfirmButton = styled(StyledBaseButton)`
  color: red;
  border-color: red;
  &:disabled {
    color: black;
    border: 1px solid black;
  }
`;
