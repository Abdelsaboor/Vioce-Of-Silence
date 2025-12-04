import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true }, // storage path or cloud URL
    duration: { type: Number }, // in seconds
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tags: [String]
}, { timestamps: true });

export default mongoose.model("Video", videoSchema);
