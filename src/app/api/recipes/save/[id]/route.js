import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/libs/connectDB";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";

export async function PUT(req, { params }) {
    const { id } = params;
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    connectDB();
    const user = await User.findOne({ email: userEmail }).populate("savedRecipes");
    const find = user?.savedRecipes?.find(recipe => recipe._id.toString() === id.toString());
    if (find) {
        await User.findOneAndUpdate({ email: userEmail }, { $pull: { savedRecipes: id } }, { new: true });
        return Response.json({
            success: true,
            message: "Recipe Unsaved!"
        });
    }
    await User.findOneAndUpdate({ email: userEmail }, { $addToSet: { savedRecipes: id } }, { new: true });
    return Response.json({
        success: true,
        message: "Recipe Saved!"
    });
}