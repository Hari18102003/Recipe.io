"use client";
import { Menu } from '@/libs/Menu';
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { BiDish } from 'react-icons/bi'
import { MdLogout } from "react-icons/md";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {

    const path = usePathname();
    const session = useSession();
    const { status } = session;
    const [open, setOpen] = useState(false);
    console.log(session?.status);
    console.log(session?.data);

    function handleMenu() {
        setOpen((state) => !state);
    }

    if (status === "unauthenticated") {
        redirect("/");
    }

    return (
        <nav className='flex md:flex-row flex-col md:items-center md:justify-between'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                    <BiDish className="text-orange-500 text-3xl md:text-4xl" />
                    <h1 className='text-xl md:text-2xl font-semibold'>Recipe.io</h1>
                </div>
                {open ? (
                    <button className='md:hidden' onClick={handleMenu}>
                        <CloseIcon />
                    </button>
                ) : (
                    <button className='md:hidden' onClick={handleMenu}>
                        <MenuIcon />
                    </button>
                )}

            </div>
            {open && (
                <ul className='flex flex-col md:flex-row items-center gap-2 md:gap-8 text-lg'>
                    {Menu.map(menu => (
                        <li key={menu.label}>
                            <Link className={path === menu.path ? 'border-b-2 pb-1 border-orange-500' : "pb-1"} href={menu.path}>{menu.label}</Link>
                        </li>
                    ))}
                    <button className='text-2xl text-orange-500' onClick={() => signOut()}><MdLogout /></button>
                </ul>
            )}
            <ul className='hidden md:flex flex-row items-center gap-2 md:gap-8 text-lg'>
                {Menu.map(menu => (
                    <li key={menu.label}>
                        <Link className={path === menu.path ? 'border-b-2 pb-1 border-orange-500' : "pb-1"} href={menu.path}>{menu.label}</Link>
                    </li>
                ))}
                <button className='text-2xl text-orange-500' onClick={() => signOut()}><MdLogout /></button>
            </ul>
        </nav>
    )
}

export default Navbar