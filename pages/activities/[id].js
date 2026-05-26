import useSWR from "swr";
import { useRouter } from "next/router";
import BackButton from "@/components/BackButton";
import ActivityInfo from "@/components/ActivityInfo";

export default function ActivityDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data: activity, isLoading } = useSWR(`/api/activities/${id}`);
  return (
    <>
      <BackButton />
      <ActivityInfo />
      <p>kuku</p>
    </>
  );
}
