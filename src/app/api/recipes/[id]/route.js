import { connectDB } from "@/libs/connectDB";
import { Recipe } from "@/models/Recipe";

export async function GET(req, { params }) {
    connectDB();
    const { id } = params;
    const recipe = await Recipe.findOne({ _id: id }).populate("creator");
    return Response.json({
        success: true,
        recipe
    });
}