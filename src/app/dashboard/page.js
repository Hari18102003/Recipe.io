"use client";
import Hero from '@/components/home/Hero';
import IndianRecipe from '@/components/home/sections/IndianRecipe';
import ItalianRecipe from '@/components/home/sections/ItalianRecipe';
import MexicanRecipe from '@/components/home/sections/MexicanRecipe';
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import React from 'react'

const Dashboardpage = () => {
    const session = useSession();
    const { status } = session;
    console.log(status);

    if (status === "unauthenticated") {
        redirect("/");
    }

    return (
        <div>
            <Hero />
            <IndianRecipe />
            <ItalianRecipe />
            <MexicanRecipe />
        </div>
    )
}

export default Dashboardpage