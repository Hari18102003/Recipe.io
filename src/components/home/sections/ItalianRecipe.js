"use client";
import React, { useEffect, useState } from 'react'
import Card from '../Card'
import axios from 'axios';
import Loader from '@/components/Loader';

const ItalianRecipe = () => {

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecipes() {
            const { data } = await axios.get("/api/recipes/all");
            if (data.success) {
                setLoading(false);
                setRecipes(data.recipes);
            }
        }
        fetchRecipes();
    }, [recipes]);

    const italianRecipes = recipes?.filter(recipe => recipe.cuisine === "Italian").slice(0, 5);

    return loading ? <Loader /> : (
        <section className='my-5'>
            <h1 className='text-xl font-bold mb-5'>Italian Recipes</h1>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
                {italianRecipes?.map(ita => (
                    <Card recipe={ita} key={ita._id} />
                ))}
            </div>
        </section>
    )
}

export default ItalianRecipe