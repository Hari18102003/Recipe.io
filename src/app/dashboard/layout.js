import { Inter } from "next/font/google";
import "../globals.css";
import SessionContext from "@/components/SessionContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Recipe.io",
    description: "Recipe App next.js search recipe add recipe",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="p-4">
                    <Toaster />
                    <SessionContext>
                        <Navbar />
                        {children}
                    </SessionContext>
                </main>
            </body>
        </html>
    );
}
