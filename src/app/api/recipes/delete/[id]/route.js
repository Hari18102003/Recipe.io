import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/libs/connectDB";
import { Recipe } from "@/models/Recipe";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";

export async function DELETE(req, { params }) {
    const { id } = params;
    connectDB();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    await User.findOneAndUpdate({ email: userEmail }, { $pull: { recipes: id } }, { new: true });
    await Recipe.findOneAndDelete({ _id: id });
    return Response.json({
        success: true,
        message: "Recipe Deleted!"
    })
}