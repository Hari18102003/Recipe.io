import { connectDB } from "@/libs/connectDB"
import { Recipe } from "@/models/Recipe";

export async function GET(req) {
    connectDB();
    const recipes = await Recipe.find().populate("creator");
    return Response.json({
        success: true,
        recipes
    });
}