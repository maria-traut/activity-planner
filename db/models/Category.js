import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    abbreviation: { type: String, required: true, minlength: 4 },
});

const Category =
    mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
