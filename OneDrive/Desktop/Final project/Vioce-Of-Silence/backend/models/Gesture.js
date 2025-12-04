import mongoose from "mongoose";

const gestureSchema = new mongoose.Schema({
    name: { // e.g., letter "A"
        type: String,
        required: true
    },
    pattern: { // numeric array or JSON of sensor values
        type: Array,
        required: true
    },
    description: { type: String }
}, { timestamps: true });

export default mongoose.model("Gesture", gestureSchema);


[100 ,120 ,,......a]