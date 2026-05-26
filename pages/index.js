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
        <p>There is no activities yet.</p>
      </div>
    );

  return (
    <div>
      <h1>Activity Planner</h1>
    </div>
  );
}
