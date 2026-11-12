import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/db/connect";
import Category from "@/db/models/Category";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	await dbConnect();

	try {
		if (request.method === "GET") {
			const category = await Category.find().sort({ name: 1 });

			return response.status(200).json(category);
		}
	} catch {
		return response.status(500).json({ status: "Internal Server Error" });
	}

	response.status(405).json({ status: "Method not allowed" });
}
