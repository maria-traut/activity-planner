import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";
import { isImageUrl } from "@/lib/imageUrlValidation";

export default async function handler(request, response) {
    await dbConnect();

    try {
        if (request.method === "GET") {
            const activities = await Activity.find()
                .populate("categories")
                .sort({ _id: -1 });

            return response.status(200).json(activities);
        }

        if (request.method === "POST") {
            const activityData = request.body;

            if (activityData?.imageUrl !== "") {
                const isImage = activityData?.imageUrl
                    ? await isImageUrl(activityData.imageUrl)
                    : false;

                if (!isImage) {
                    return response.status(400).json({
                        status: "Image URL is not linking to a valid image.",
                    });
                }
            }

            await Activity.create(activityData);

            return response
                .status(201)
                .json({ status: "Activity successfully created." });
        }
    } catch (error) {
        return response.status(500).json({ status: "Internal Server Error" });
    }

    response.status(405).json({ status: "Method not allowed" });
}
