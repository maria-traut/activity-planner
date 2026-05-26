import useSWR from "swr";

export default function HomePage() {
  const { data, isLoading, error } = useSWR("/api/activities");

  if (isLoading)
    return (
      <div>
        <h1>Activity Planner</h1>
        <p>Loading activities...</p>
      </div>
    );

  if (!data || error)
    return (
      <div>
        <h1>Activity Planner</h1>
        <p>An error occured while fetching the activities.</p>
      </div>
    );

  return (
    <div>
      <h1>Activity Planner</h1>
      {console.log(data)}
    </div>
  );
}
