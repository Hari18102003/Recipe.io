"use client";
import Loader from '@/components/Loader';
import Card from '@/components/home/Card';
import axios from 'axios';
import FilterListIcon from '@mui/icons-material/FilterList';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import React, { useEffect, useState } from 'react'
import { redirect, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import CloseIcon from '@mui/icons-material/Close';

const Recipespage = () => {

    const session = useSession();
    const { status } = session;
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCooktime, setSelectedCooktime] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [search, setSearch] = useState("");
    const [searchRecipes, setSearchRecipes] = useState([]);
    const [open, setOpen] = useState(false);
    const params = useSearchParams();
    const searchTerm = params.get("searchTerm");

    useEffect(() => {
        setSearch(searchTerm);
    }, [searchTerm])

    console.log(search, selectedCooktime);

    const handleCooktime = (event) => {
        event.preventDefault();
        setSelectedCooktime(event.target.value);
    };
    const handleCuisine = (event) => {
        event.preventDefault();
        setSelectedCuisine(event.target.value);
    };

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

    useEffect(() => {
        let filteredBySearch = recipes;
        if (search) {
            filteredBySearch = recipes.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase()));
        }

        let filteredByCooktime = filteredBySearch;
        if (selectedCooktime === "10 min") {
            filteredByCooktime = filteredBySearch.filter(recipe => (
                parseInt(recipe.cook_time.split(" ")[0]) < 10 && recipe.cook_time.split(" ")[1] === "minutes"
            ));
        }
        if (selectedCooktime === "10-30 min") {
            filteredByCooktime = filteredBySearch.filter(recipe => (
                parseInt(recipe.cook_time.split(" ")[0]) > 10 && parseInt(recipe.cook_time.split(" ")[0]) <= 30 &&
                recipe.cook_time.split(" ")[1] === "minutes"
            ));
        }
        if (selectedCooktime === "1 hr") {
            filteredByCooktime = filteredBySearch.filter(recipe => (
                parseInt(recipe.cook_time.split(" ")[0]) >= 1 && (recipe.cook_time.split(" ")[1] === "hours" ||
                    recipe.cook_time.split(" ")[1] === "hour")
            ));
        }
        let filteredByCuisine = filteredByCooktime;
        if (selectedCuisine) {
            filteredByCuisine = filteredByCooktime.filter(recipe => recipe.cuisine.toLowerCase() === selectedCuisine.toLowerCase());
        }

        setSearchRecipes(filteredByCuisine);
    }, [search, selectedCooktime, recipes, selectedCuisine]);


    function handleClear(e) {
        e.preventDefault();
        location.reload();
    }

    function handleFilter() {
        setOpen((state) => !state);
    }

    if (status === "unauthenticated") {
        redirect("/");
    }

    return loading ? <Loader /> : (
        <div className="my-6 flex md:flex-row flex-col gap-3">
            {open ? (
                <button onClick={handleFilter} className='ms-auto md:hidden p-1 bg-orange-300 w-24 rounded-md flex items-center text-white font-medium'>
                    <CloseIcon />
                    <span>Filters</span>
                </button>
            ) : (
                <button onClick={handleFilter} className='ms-auto md:hidden p-1 bg-orange-300 w-24 rounded-md flex items-center text-white font-medium'>
                    <FilterListIcon />
                    <span>Filters</span>
                </button>
            )}
            {open && (
                <div className="w-[250px] bg-white">
                    <div className='shadow-md p-4 flex flex-col gap-4'>
                        <h1 className='text-lg flex items-center gap-2 text-black font-medium'><FilterListIcon /><span>Filters</span></h1>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <input type='search' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search..' className='w-full border-2 border-orange-400 outline-none p-2 rounded-md' />
                            </div>
                            <div className='flex flex-col gap-5'>
                                <div>
                                    <button className='text-black flex items-center gap-1 font-medium'><AccessTimeIcon /><span>Cook time</span></button>
                                    <div className='p-3 flex flex-col gap-3'>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                type="radio"
                                                id="10min"
                                                name="cooktime"
                                                value="10 min"
                                                checked={selectedCooktime === "10 min"}
                                                onChange={handleCooktime}
                                            />
                                            <label htmlFor="10min">10 min</label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                type="radio"
                                                id="30min"
                                                name="cooktime"
                                                value="10-30 min"
                                                checked={selectedCooktime === "10-30 min"}
                                                onChange={handleCooktime}
                                            />
                                            <label htmlFor="30min">10-30 min</label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                type="radio"
                                                id="1hr"
                                                name="cooktime"
                                                value="1 hr"
                                                checked={selectedCooktime === "1 hr"}
                                                onChange={handleCooktime}
                                            />
                                            <label htmlFor="1hr">&gt;1 hr</label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className='text-black flex items-center gap-1 font-medium'><PlaceIcon /><span>Cuisine</span></button>
                                    <div className='p-3 flex flex-col gap-3'>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                type="radio"
                                                id="Indian"
                                                name="cuisine"
                                                value="Indian"
                                                checked={selectedCuisine === "Indian"}
                                                onChange={handleCuisine}
                                            />
                                            <label htmlFor="Indian">Indian</label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                type="radio"
                                                id="Mexican"
                                                name="cuisine"
                                                value="Mexican"
                                                checked={selectedCuisine === "Mexican"}
                                                onChange={handleCuisine}
                                            />
                                            <label htmlFor="Mexican">Mexican</label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                type="radio"
                                                id="Italian"
                                                name="cuisine"
                                                value="Italian"
                                                checked={selectedCuisine === "Italian"}
                                                onChange={handleCuisine}
                                            />
                                            <label htmlFor="Italian">Italian</label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                type="radio"
                                                id="Chinese"
                                                name="cuisine"
                                                value="Chinese"
                                                checked={selectedCuisine === "Chinese"}
                                                onChange={handleCuisine}
                                            />
                                            <label htmlFor="Chinese">Chinese</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleClear} className='w-full rounded-md bg-orange-300 p-1'>Clear filters</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="w-1/4 md:block hidden sticky top-0 h-screen">
                <div className='shadow-md p-4 flex flex-col gap-4'>
                    <h1 className='text-lg flex items-center gap-2 text-black font-medium'><FilterListIcon /><span>Filters</span></h1>
                    <div className='flex flex-col gap-3'>
                        <div>
                            <input type='search' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search..' className='w-full border-2 border-orange-400 outline-none p-2 rounded-md' />
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div>
                                <button className='text-black flex items-center gap-1 font-medium'><AccessTimeIcon /><span>Cook time</span></button>
                                <div className='p-3 flex flex-col gap-3'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="radio"
                                            id="10min"
                                            name="cooktime"
                                            value="10 min"
                                            checked={selectedCooktime === "10 min"}
                                            onChange={handleCooktime}
                                        />
                                        <label htmlFor="10min">10 min</label>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="radio"
                                            id="30min"
                                            name="cooktime"
                                            value="10-30 min"
                                            checked={selectedCooktime === "10-30 min"}
                                            onChange={handleCooktime}
                                        />
                                        <label htmlFor="30min">10-30 min</label>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="radio"
                                            id="1hr"
                                            name="cooktime"
                                            value="1 hr"
                                            checked={selectedCooktime === "1 hr"}
                                            onChange={handleCooktime}
                                        />
                                        <label htmlFor="1hr">&gt;1 hr</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className='text-black flex items-center gap-1 font-medium'><PlaceIcon /><span>Cuisine</span></button>
                                <div className='p-3 flex flex-col gap-3'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="radio"
                                            id="Indian"
                                            name="cuisine"
                                            value="Indian"
                                            checked={selectedCuisine === "Indian"}
                                            onChange={handleCuisine}
                                        />
                                        <label htmlFor="Indian">Indian</label>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="radio"
                                            id="Mexican"
                                            name="cuisine"
                                            value="Mexican"
                                            checked={selectedCuisine === "Mexican"}
                                            onChange={handleCuisine}
                                        />
                                        <label htmlFor="Mexican">Mexican</label>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="radio"
                                            id="Italian"
                                            name="cuisine"
                                            value="Italian"
                                            checked={selectedCuisine === "Italian"}
                                            onChange={handleCuisine}
                                        />
                                        <label htmlFor="Italian">Italian</label>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="radio"
                                            id="Chinese"
                                            name="cuisine"
                                            value="Chinese"
                                            checked={selectedCuisine === "Chinese"}
                                            onChange={handleCuisine}
                                        />
                                        <label htmlFor="Chinese">Chinese</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClear} className='w-full rounded-md bg-orange-300 p-1'>Clear filters</button>
                    </div>
                </div>
            </div>
            <div className="w-3/4">
                <div>
                    <h1 className='text-lg font-semibold'>Recipes</h1>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
                        {searchRecipes?.map(recipe => (
                            <Card key={recipe._id} recipe={recipe} />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Recipespage