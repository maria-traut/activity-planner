import ActivityCard from "components/ActivityCard";

export default function ActivityList({ activities }) {
  return (
    <ul>
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
    </ul>
  );
}
