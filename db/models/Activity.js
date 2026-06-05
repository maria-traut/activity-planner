import mongoose from "mongoose";
import "./Category";

const { Schema } = mongoose;

const activitySchema = new Schema(
    {
        title: { type: String, required: true, minlength: 3 },
        imageUrl: { type: String },
        categories: { type: [Schema.Types.ObjectId], ref: "Category" },
        description: { type: String },
        area: { type: String },
        country: { type: String },
    },
    { timestamps: true }
);

const Activity =
    mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default Activity;
