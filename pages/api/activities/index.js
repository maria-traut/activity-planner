import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";
import { isImageUrl } from "@/lib/imageUrlValidation";

export default async function handler(request, response) {
    await dbConnect();

    try {
        if (request.method === "GET") {
            const { title, area, categories, country, categoriesEvery } =
                request.query;
            const filter = {};
            const isCategoriesEveryChecked = categoriesEvery === "true";

            if (title) {
                filter.title = { $regex: title, $options: "i" };
            }

            if (area) {
                filter.area = { $regex: area, $options: "i" };
            }

            if (country) {
                filter.country = {
                    $in: country.split(","),
                };
            }

            if (categories) {
                const categoryArray = categories.split(",");

                if (isCategoriesEveryChecked) {
                    filter.categories = { $all: categoryArray };
                } else {
                    filter.categories = { $in: categoryArray };
                }
            }

            const activities = await Activity.find(filter)
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

            const createdActivity = await Activity.create(activityData);
            return response.status(201).json({
                status: "Activity successfully created.",
                _id: createdActivity._id,
            });
        }
    } catch (error) {
        return response.status(500).json({ status: "Internal Server Error" });
    }

    response.status(405).json({ status: "Method not allowed" });
}
