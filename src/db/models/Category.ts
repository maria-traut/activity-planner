import mongoose, { type InferSchemaType, type Model } from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
	name: { type: String, required: true },
	color: { type: String, required: true },
	abbreviation: { type: String, required: true, minlength: 4 },
});

const Category: Model<InferSchemaType<typeof categorySchema>> =
	mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
