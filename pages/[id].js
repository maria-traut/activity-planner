import useSWR from "swr";
import { useRouter } from "next/router";
import BackButton from "@/components/BackButton";
import ActivityInfo from "@/components/ActivityInfo";

export default function ActivityDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data: activity, isLoading, error } = useSWR(`/api/activities/${id}`);

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
    <>
      <BackButton />
      <ActivityInfo activity={activity} />
    </>
  );
}
