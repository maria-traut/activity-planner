import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

export default async function handler(request, response) {
  await dbConnect();

  try {
    const { id } = request.query;
    if (request.method === "GET") {
      const activity = await Activity.findById(id);
      if (!activity) {
        return response.status(404).json({ status: "Activity not found" });
      }
      return response.status(200).json(activity);
    }
  } catch (error) {
    return response.status(500).json({ status: "Internal Server Error" });
  }

  response.status(405).json({ status: "Method not allowed" });
}
