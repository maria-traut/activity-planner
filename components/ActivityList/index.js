import useSWR from "swr";
import ActivityCard from "components/ActivityCard";

export default function ActivityList() {
  const { data, isLoading, error } = useSWR("/api/activities");

  if (isLoading)
    return (
      <div>
        <h1>Activity Planner</h1>
        <p>Loading activities...</p>
      </div>
    );

  if (error)
    return (
      <div>
        <h1>Activity Planner</h1>
        <p>An error occured while fetching data.</p>
      </div>
    );

  if (!data)
    return (
      <div>
        <h1>Activity Planner</h1>
        <p>
          {" "}
          Sorry, we could not retrieve the latest activities at the moment.
          Please try again later.
        </p>
      </div>
    );

  return (
    <>
      <ActivityList>
        {data.map((activity) => (
          <li key={activity._id}>
            <ActivityCard
              src="/placeholder.jpg"
              title={activity.title}
              categories={activity.categories}
              id={activity._id}
            />
          </li>
        ))}
      </ActivityList>
    </>
  );
}
