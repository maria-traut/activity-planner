import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";
import { isImageUrl } from "@/lib/imageUrlValidation";

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
    } catch (error) {
        return response.status(500).json({
            status: "Internal Server error. ",
        });
    }
    try {
        if (request.method === "PUT") {
            const updatedActivityData = request.body;

            if (updatedActivityData?.imageUrl !== "") {
                const isImage = updatedActivityData?.imageUrl
                    ? await isImageUrl(updatedActivityData.imageUrl)
                    : false;

                if (!isImage) {
                    return response.status(400).json({
                        status: "Image URL is not linking to a valid image.",
                    });
                }
            }

            await Activity.findByIdAndUpdate(id, updatedActivityData);
            return response.status(200).json({
                status: "The activity has been updated successfully!",
            });
        }
    } catch (error) {
        return response.status(500).json({
            status: "The activity could not have been updated, please try again! ",
        });
    }
    try {
        if (request.method === "DELETE") {
            await Activity.findByIdAndDelete(id);
            return response.status(200).json({
                status: "The activity has been deleted successfully!",
            });
        }
    } catch (error) {
        return response.status(500).json({
            status: "The activity could not have been deleted, please try again! ",
        });
    }

    response.status(405).json({ status: "Method not allowed" });
}
