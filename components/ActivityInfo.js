import Image from "next/image";
export default function ActivityInfo({ activity }) {
  return (
    <>
      <div>
        <h1> {activity.title}</h1>
        <Image
          src={activity.imageURL}
          width={500}
          height={300}
          alt="Picture symbolizing"
          fill
        />
      </div>
    </>
  );
}
