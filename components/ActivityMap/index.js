export default function ActivityMap({ activities }) {
    return (
        <>
            {activities.map((activity) => (
                <li key={activity._id}>{activity.country}</li>
            ))}
        </>
    );
}
