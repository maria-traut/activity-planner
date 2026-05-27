import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const activities = await Activity.find().populate("categories");

      return response.status(200).json(activities);
    }
  } catch (error) {
    return response.status(500).json({ status: "Internal Server Error" });
  }

  response.status(405).json({ status: "Method not allowed" });
}
