import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: { type: String },
    voice: { type: String }, // path to voice file
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);
