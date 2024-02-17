import { connectDB } from "@/libs/connectDB";
import { User } from "@/models/User";
import NextAuth from "next-auth"
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            id: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;
                connectDB();
                const user = await User.findOne({ email });
                if (user) {
                    const match = bcrypt.compareSync(password, user.password);
                    if (match) {
                        return user;
                    }
                }
                throw new Error("Invalid user");
            }
        })
    ]
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }