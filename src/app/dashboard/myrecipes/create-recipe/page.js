"use client";
import React, { useEffect, useState } from 'react'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const CreateRecipepage = () => {

    const session = useSession();
    const { status } = session;

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [cooktime, setCooktime] = useState(1);
    const [selectedOption, setSelectedOption] = useState('');
    const [cuisine, setCuisine] = useState("");
    const [calories, setCalories] = useState("");
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();

    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState('');

    const [methods, setMethods] = useState([]);
    const [newMethod, setNewMethod] = useState('');

    const router = useRouter();

    const handleChange = (event) => {
        setNewIngredient(event.target.value);
    };

    const handleAddIngredient = () => {
        if (newIngredient.trim() !== '') {
            setIngredients([...ingredients, newIngredient]);
            setNewIngredient('');
        }
    };

    const handleChangeMethod = (event) => {
        setNewMethod(event.target.value);
    };

    const handleAddMethod = () => {
        if (newMethod.trim() !== '') {
            setMethods([...methods, newMethod]);
            setNewMethod('');
        }
    };

    useEffect(() => {
        if (!file) return;
        let tmp = [];
        tmp.push(URL.createObjectURL(file));
        const objectUrls = tmp[0];
        setPreview(objectUrls);
        return URL.revokeObjectURL(objectUrls[0]);
    }, [file]);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    async function handleCreate(e) {
        setLoading(true);
        e.preventDefault();
        const cook_time = `${cooktime} ${selectedOption}`;
        if (file) {
            const imageData = new FormData();
            imageData.append("file", file);
            imageData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);
            imageData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME);
            const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, imageData);
            const res = await axios.post("/api/recipes/create", { name, cook_time, image: data.url, ingredients, preparation_method: methods, cuisine, calories });
            if (res.data.success) {
                toast.success(res.data.message);
                router.push("/dashboard/myrecipes");
                setLoading(false);
            }
            else {
                setLoading(false);
                toast.error(res.data.message);
            }
        } else {
            toast.error("Upload Image");
        }

    }

    if (status === "unauthenticated") {
        redirect("/");
    }

    return (
        <section className='my-10 flex items-center justify-center'>
            <div className='flex items-center justify-center'>
                <form onSubmit={handleCreate} className='flex w-[300px] md:w-[500px] flex-col gap-5 text-black font-medium mx-auto'>
                    <h1 className='text-2xl text-center text-orange-600 font-semibold mb-5'>Create a recipe</h1>
                    <div className='flex gap-3 items-center'>
                        {preview ? (
                            <>
                                <Image src={preview} width={300} height={300} alt='recipe-image' />
                                <label className='text-lg' htmlFor='image'>Change Image</label>
                            </>

                        ) : (
                            <>
                                <AddPhotoAlternateOutlinedIcon htmlFor={"image"} className='text-[80px]' />
                                <label className='text-lg' htmlFor='image'>Recipe Image</label>
                            </>

                        )}
                        <input onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                setFile(e.target.files[0]);
                            }
                        }} id='image' type='file' className='hidden' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label className='text-lg'>Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} className='bg-orange-100 p-2 rounded-lg' type='text' placeholder='Recipe Name' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label className='text-lg'>Cook Time</label>
                        <div>
                            <input value={cooktime} onChange={e => setCooktime(e.target.value)} className='bg-orange-100 p-1 text-center w-[60px] rounded-lg' type='number' min={1} />
                            <select value={selectedOption} onChange={handleSelectChange}>
                                <option>Select.</option>
                                <option>minutes</option>
                                <option>hours</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label className='text-lg'>Ingredients</label>
                        <div className='flex flex-col gap-2'>
                            {ingredients.map((ingredient, index) => (
                                <div className='bg-orange-100 p-2 rounded-lg' key={index}>
                                    {ingredient}
                                </div>
                            ))}
                        </div>
                        <div className='flex gap-3 items-center'>
                            <input
                                type="text"
                                value={newIngredient}
                                onChange={handleChange}
                                placeholder="Enter ingredient"
                                className='bg-orange-100 p-2 rounded-lg'
                            />
                            <button type='button' className='bg-orange-300 p-2 rounded-lg' onClick={handleAddIngredient}>Add</button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label className='text-lg'>Methods</label>
                        <div className='flex flex-col gap-2'>
                            {methods.map((method, index) => (
                                <div className='bg-orange-100 p-2 rounded-lg' key={index}>
                                    {method}
                                </div>
                            ))}
                        </div>
                        <div className='flex gap-3 items-center'>
                            <input
                                type="text"
                                value={newMethod}
                                onChange={handleChangeMethod}
                                placeholder="Enter method"
                                className='bg-orange-100 p-2 rounded-lg'
                            />
                            <button type='button' className='bg-orange-300 p-2 rounded-lg' onClick={handleAddMethod}>Add</button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label className='text-lg'>Cuisine</label>
                        <input value={cuisine} onChange={(e) => setCuisine(e.target.value)} className='bg-orange-100 p-2 rounded-lg' type='text' placeholder='Cuisine' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label className='text-lg'>Calories</label>
                        <input value={calories} onChange={(e) => setCalories(e.target.value)} className='bg-orange-100 p-2 rounded-lg' type='text' placeholder='eg:450 kcal' />
                    </div>
                    <button type='submit' disabled={loading} className='bg-orange-500 text-white p-2 rounded-xl'>Submit</button>
                </form>
            </div>
        </section>
    )
}

export default CreateRecipepage