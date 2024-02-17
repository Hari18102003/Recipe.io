"use client";
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Hero = () => {

    const [search, setSearch] = useState("");

    return (
        <section className='relative my-3 h-[250px] md:h-[400px]'>
            <Image src={"/images/hero.jpg"} alt='hero-image' fill={true} className='rounded-lg' style={{ objectFit: "cover" }} />
            <div className='absolute inset-0 bg-gradient-to-br from-black to-transparent opacity-95'></div>
            <div className='absolute inset-0 flex items-center justify-center'>
                <div className='relative'>

                    <input value={search} onChange={e => setSearch(e.target.value)} type='search' className='w-[300px] md:w-[600px] outline-none h-8 md:h-12 rounded-md px-6' placeholder='Search recipes..' />
                    <Link href={`/recipes?searchTerm=${search}`} className='absolute rounded-md px-5 h-8 md:h-12 text-white top-0 right-0 bg-orange-600 flex items-center justify-center'>Search</Link>

                </div>
            </div>
        </section>
    )
}

export default Hero