import { connectDB } from "@/libs/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";

export async function GET(req) {
    connectDB();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const user = await User.findOne({ email: userEmail }).populate("savedRecipes");
    return Response.json({
        success: true,
        user
    });
}