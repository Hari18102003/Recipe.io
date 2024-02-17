import mongoose from "mongoose";
import { User } from "./User";

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    cook_time: {
        type: String,
        required: true
    },
    ingredients: [String],
    preparation_method: [String],
    cuisine: {
        type: String,
        required: true
    },
    calories: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export const Recipe = mongoose.models["Recipe"] || mongoose.model("Recipe", recipeSchema);