import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const activities = await Activity.find().sort({ _id: -1 });

      return response.status(200).json(activities);
    }

    if (request.method === "POST") {
      const activityData = request.body;

      await Activity.create(activityData);

      return response.status(201).json({ status: "Activity created" });
    }
  } catch (error) {
    return response.status(500).json({ status: "Internal Server Error" });
  }

  response.status(405).json({ status: "Method not allowed" });
}
