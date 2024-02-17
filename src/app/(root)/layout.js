import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import SessionContext from "@/components/SessionContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Recipe.io",
  description: "Recipe App next.js search recipe add recipe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="relative h-screen">
          <SessionContext>
            <Toaster />
            <Image src={"/images/background.jpg"} fill={true}
              style={{ objectFit: "cover" }} alt="background-image" />
            <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent opacity-60"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {children}
            </div>
          </SessionContext>
        </main>
      </body>
    </html>
  );
}
