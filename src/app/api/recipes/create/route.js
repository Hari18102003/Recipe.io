import { connectDB } from "@/libs/connectDB";
import { Recipe } from "@/models/Recipe";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
    connectDB();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const { name, cuisine, calories, ingredients, preparation_method, cook_time, image } = await req.json();
    if (!name || !cuisine || !calories || !ingredients.length > 0 || !cook_time || !image || !preparation_method) {
        return Response.json({
            success: false,
            message: "Fill the empty fields"
        });
    }
    const user = await User.findOne({ email: userEmail });
    const recipe = await Recipe.create({ name, cuisine, image, calories, ingredients, preparation_method, cook_time, creator: user._id });
    await User.findOneAndUpdate({ email: userEmail }, { $addToSet: { recipes: recipe._id } }, { new: true });
    return Response.json({
        success: true,
        message: "Recipe posted!"
    });
}