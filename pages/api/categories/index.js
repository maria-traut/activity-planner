import dbConnect from "@/db/connect";
import Category from "@/db/models/Category";

export default async function handler(request, response) {
    await dbConnect();

    try {
        if (request.method === "GET") {
            const category = await Category.find().sort({ name: 1 });

            return response.status(200).json(category);
        }
    } catch (error) {
        return response.status(500).json({ status: "Internal Server Error" });
    }

    response.status(405).json({ status: "Method not allowed" });
}
