"use client";
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import { redirect, useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import { useSession } from 'next-auth/react';

const Recipepage = ({ params }) => {

    const { id } = params;

    const session = useSession();
    const { status } = session;

    const [user, setUser] = useState(null);
    const [recipe, setRecipe] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchRecipe() {
            const { data } = await axios.get(`/api/recipes/${id}`);
            if (data.success) {
                setRecipe(data.recipe);
            }
        }
        fetchRecipe();
    }, [id]);

    useEffect(() => {
        async function fetchUser() {
            const { data } = await axios.get("/api/user");
            if (data.success) {
                setLoading(false);
                setUser(data.user);
            }
        }
        fetchUser();
    }, [user]);

    async function handleSave(id) {
        const { data } = await axios.put(`/api/recipes/save/${id}`);
        if (data.success) {
            toast.success(data.message);
        }
    }

    async function handleDelete(id) {
        const { data } = await axios.delete(`/api/recipes/delete/${id}`);
        if (data.success) {
            toast.success(data.message);
            router.push("/dashboard/myrecipes");
        }
    }

    if (status === "unauthenticated") {
        redirect("/");
    }

    return loading ? <Loader /> : (
        <>
            {recipe && (
                <section className='my-10'>
                    <div className='flex md:flex-row flex-col gap-7 md:justify-center'>
                        <div className='relative w-[330px] h-[300px] md:w-[400px] md:h-[500px] rounded-md'>
                            <Image src={recipe.image} className='rounded-md' alt='recipe-img' fill={true} style={{ objectFit: "cover" }} />
                        </div>
                        <div className='flex flex-col gap-4 md:gap-7'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h1 className='text-orange-600 font-semibold text-xl md:text-2xl'>{recipe.name}</h1>
                                    <p className='text-sm text-gray-600'>{recipe.creator?.username ? `By ${recipe.creator.username}` : ""}</p>
                                </div>
                                <button onClick={() => handleSave(recipe._id)}>
                                    {user?.savedRecipes?.find(saved => saved._id.toString() === recipe._id.toString()) ? (
                                        <BookmarkIcon className='text-orange-600 text-[30px] md:text-[38px]' />
                                    ) : <BookmarkAddOutlinedIcon className='text-orange-600 text-[30px] md:text-[38px]' />}
                                </button>
                            </div>
                            <div className='flex items-center'>
                                <div className='flex items-center flex-col gap-3 border-r-2 border-r-gray-500 p-5'>
                                    <h1 className='text-xl md:text-2xl font-semibold'>{recipe.cook_time}</h1>
                                    <p className='text-sm text-gray-600'>Cook time</p>
                                </div>
                                <div className='flex items-center flex-col gap-3 border-r-2 border-r-gray-500 p-5'>
                                    <h1 className='text-xl md:text-2xl font-semibold'>{recipe.cuisine}</h1>
                                    <p className='text-sm text-gray-600'>Cuisine</p>
                                </div>
                                <div className='flex items-center flex-col gap-3 p-5'>
                                    <h1 className='text-xl md:text-2xl font-semibold'>{recipe.calories}</h1>
                                    <p className='text-sm text-gray-600'>Calories</p>
                                </div>
                            </div>
                            <div>
                                <h1 className='text-xl font-semibold mb-3'>Ingredients</h1>
                                <ul className='list-disc pl-5'>
                                    {recipe?.ingredients?.map((ing, index) => (
                                        <li key={index}>{ing}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h1 className='text-xl font-semibold mb-3'>Methods</h1>
                                <ul className='list-disc pl-5'>
                                    {recipe?.preparation_method?.map((method, index) => (
                                        <li key={index}>{method}</li>
                                    ))}
                                </ul>
                            </div>
                            {recipe.creator?.email === user?.email && (
                                <button onClick={() => handleDelete(recipe._id)} className='bg-red-200 p-2 rounded-md text-red-500'>Delete recipe <DeleteIcon className='text-xl' /></button>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default Recipepage