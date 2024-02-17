"use client";
import React, { useEffect, useState } from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Link from 'next/link';
import Card from '@/components/home/Card';
import axios from 'axios';
import Loader from '@/components/Loader';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const MyRecipespage = () => {

    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);

    const session = useSession();
    const { status } = session;

    useEffect(() => {
        async function getSavedRecipes() {
            const { data } = await axios.get("/api/recipes/myrecipes");
            if (data.success) {
                setLoading(false);
                setRecipes(data.recipes);
            }
        }
        getSavedRecipes();
    }, [recipes]);

    if (status === "unauthenticated") {
        redirect("/");
    }

    return loading ? <Loader /> : (
        <section className='my-10'>
            <h1 className='text-2xl text-orange-600 font-semibold mb-5'>My Recipes</h1>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
                <Link href={"/dashboard/myrecipes/create-recipe"}>
                    <div className='w-68 h-60 flex items-center gap-1 justify-center flex-col rounded-md bg-orange-100 shadow text-xl text-black'>
                        <AddCircleOutlineOutlinedIcon className='text-3xl' />
                        <span>Add Recipe</span>
                    </div>
                </Link>
                {recipes?.map(recipe => (
                    <Card key={recipe._id} recipe={recipe} />
                ))}
            </div>
        </section>
    )
}

export default MyRecipespage