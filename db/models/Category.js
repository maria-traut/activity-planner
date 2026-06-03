import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: { type: String },
    abbreviation: { type: String },
});

const Category =
    mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
