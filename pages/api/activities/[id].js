import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

export default async function handler(request, response) {
    await dbConnect();
    const { id } = request.query;

    try {
        if (request.method === "GET") {
            const activity = await Activity.findById(id).populate("categories");
            if (!activity) {
                return response
                    .status(404)
                    .json({ status: "Activity not found" });
            }
            return response.status(200).json(activity);
        }

        if (request.method === "PUT") {
            const updatedActivityData = request.body;
            await Activity.findByIdAndUpdate(id, updatedActivityData);
            return response
                .status(200)
                .json({ status: "Activity successfully updated." });
        }

        if (request.method === "DELETE") {
            await Activity.findByIdAndDelete(id);
            response.status(200).json({ status: "Activity deleted." });
        }
    } catch (error) {
        return response.status(500).json({ status: "Internal Server Error" });
    }

    response.status(405).json({ status: "Method not allowed" });
}
