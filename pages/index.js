import useSWR from "swr";
import ActivityForm from "@/components/ActivityForm";
import { useState, useEffect } from "react";

export default function HomePage() {
  const { data, isLoading, error, mutate } = useSWR("/api/activities");
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
        <h1>Activity Planner</h1>
        <p>Loading activities...</p>
      </div>
    );
  }

  if (!data || error) {
    return (
      <div>
        <h1>Activity Planner</h1>
        <p>An error occured while fetching the activities.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Activity Planner</h1>
      <ActivityForm
        onSubmit={handleActivityCreate}
        status={activityFormStatus}
      />
    </div>
  );
}
