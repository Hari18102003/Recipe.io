"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { BiDish } from "react-icons/bi";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
export default function Home() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const session = useSession();
  const { status } = session;

  async function handleLogin(e) {
    setLoading(true);
    e.preventDefault();
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res.error) {
      setLoading(false);
      toast.error("Invalid email or password");
    } else {
      setLoading(false);
      setLogin(true);
    }
  }

  if (login) {
    redirect("/dashboard");
  }

  if (status === "authenticated") {
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex gap-5 items-center justify-center flex-col bg-transparent shadow-lg rounded-md shadow-white p-5">
        <h1 className="font-bold text-2xl text-orange-500 flex gap-2 items-center"><BiDish className="text-4xl" /><span>Recipe.io</span></h1>
        <form className="w-[320px] md:w-[380px]" onSubmit={handleLogin}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-orange-500">Your email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@email.com" />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-orange-500">Your password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Password" />
          </div>
          <Link href={"/register"} className="text-white block m-3 text-center text-sm" >New User? Sign Up</Link>
          <button disabled={loading} type="submit" className="disabled:cursor-not-allowed text-white bg-orange-600 hover:bg-orange-700 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Login</button>
        </form>
      </div>
    </div>
  );
}