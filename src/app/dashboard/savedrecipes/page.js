"use client";
import Loader from '@/components/Loader';
import Card from '@/components/home/Card';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SavedRecipepage = () => {

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const session = useSession();
    const { status } = session;

    useEffect(() => {
        async function getSavedRecipes() {
            const { data } = await axios.get("/api/recipes/save");
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
            <h1 className='text-2xl text-orange-600 font-semibold mb-5'>Saved Recipes</h1>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
                {recipes.length > 0 && (
                    recipes.map(recipe => (
                        <Card key={recipe._id} recipe={recipe} />
                    ))
                )}
                {!recipes.length > 0 && <h1 className='text-lg text-black font-medium'>No Saved Recipes</h1>}
            </div>
        </section>
    )
}

export default SavedRecipepage