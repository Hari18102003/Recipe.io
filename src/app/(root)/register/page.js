"use client"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BiDish } from 'react-icons/bi'

const Registerpage = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const session = useSession();
    const { status } = session;

    async function handleRegister(e) {
        setLoading(true);
        e.preventDefault();
        const { data } = await axios.post("/api/register", { username, email, password });
        if (data.success) {
            setLoading(false);
            router.push("/")
            toast.success("Registered Successfully")
            setUsername("");
            setEmail("");
            setPassword("");
        }
        else {
            setLoading(false);
            toast.error(data.message)
            setPassword("");
        }
    }

    if (status === "authenticated") {
        redirect("/dashboard");
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex gap-5 items-center justify-center flex-col bg-transparent shadow-lg rounded-md shadow-white p-5">
                <h1 className="font-bold text-2xl text-orange-500 flex gap-2 items-center"><BiDish className="text-4xl" /><span>Recipe.io</span></h1>
                <form className="w-[320px] md:w-[380px]" onSubmit={handleRegister}>
                    <div className="mb-5">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-orange-500">Username</label>
                        <input value={username} onChange={e => setUsername(e.target.value)} type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Username" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-orange-500">Your email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@email.com" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-orange-500">Your password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Password" />
                    </div>
                    <Link href={"/"} className="text-white block m-3 text-center text-sm" >Existing User? Login</Link>
                    <button disabled={loading} type="submit" className="text-white disabled:cursor-not-allowed bg-orange-600 hover:bg-orange-700 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default Registerpage