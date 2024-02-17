"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import AccessAlarmsOutlinedIcon from '@mui/icons-material/AccessAlarmsOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import axios from 'axios';
import toast from 'react-hot-toast';

const Card = ({ recipe }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const { data } = await axios.get("/api/user");
            if (data.success) {
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

    return (
        <>
            {recipe && (
                <div className='w-68 h-60 rounded-md shadow'>
                    <Link href={`/dashboard/recipe/${recipe._id}`}>
                        <div className='w-full h-44 relative rounded-md'>
                            <Image src={recipe.image} className='rounded-md' alt='recipe-img' fill={true} style={{ objectFit: "cover" }} />
                        </div>
                    </Link>
                    <div className='flex items-center justify-between p-2'>
                        <Link href={`/dashboard/recipe/${recipe._id}`}>
                            <div>
                                <h1 className='text-md text-orange-500 font-semibold'>{recipe.name.length > 15 ? `${recipe.name.substring(0, 15)}..` : recipe.name}</h1>
                                <p className='text-slate-400 flex gap-1 items-center text-xs'>
                                    <AccessAlarmsOutlinedIcon />
                                    <span>{recipe.cook_time}</span>
                                </p>
                            </div>
                        </Link>
                        <button onClick={() => handleSave(recipe._id)}>
                            {user?.savedRecipes?.find(saved => saved._id.toString() === recipe._id.toString()) ? (
                                <BookmarkIcon className='text-orange-600' />
                            ) : <BookmarkAddOutlinedIcon className='text-orange-600' />}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Card