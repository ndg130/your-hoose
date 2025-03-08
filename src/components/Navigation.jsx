import { Link } from "react-router-dom"
import Logo from '../assets/images/yourhoose-logo.png'
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useState } from "react";
export default function Navigation() {

    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <>
        <div className='bg-white relative px-4 py-4 md:py-6 h-[70px] md:h-[90px] z-20 flex border-b border-solid border-gray-300'>
            <div className='max-w-7xl mx-auto flex justify-between items-center relative my-auto w-full'>
                <div className="hidden md:block min-w-10"></div>
                <div className="absolute left-1/2 -translate-x-1/2 flex justify-center">
                    <Link to='/'>
                        <img src={Logo}  alt="Logo" className="h-4 sm:h-6"/>
                    </Link>
                </div>
                <div className="flex gap-x-4 ml-auto">
                    <Link className="border-2 border-solid border-accent-dark text-accent-dark hover:text-primary colour-ease cursor-pointer font-medium text-sm px-3 py-1.5 rounded-2xl hidden md:block">Sign In / Register</Link>
                    <button onClick={() => {setMenuVisible(!menuVisible)}}>
                        {!menuVisible ? <HiOutlineMenu className="text-3xl text-accent-dark"/> : <HiX className="text-3xl text-accent-dark"/>}
                    </button>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
            <div
                className={`fixed md:absolute left-0 md:left-auto md:right-5 top-[70px] md:top-[10px] z-[100] 
                    bg-white h-[calc(100%-70px)] md:h-auto md:min-h-[300px] w-full md:w-[300px] 
                    shadow-xl p-4 md:rounded-lg border-t md:border-none border-accent-dark 
                    transform transition-all ease-linear duration-200
                    ${menuVisible 
                        ? 'opacity-100 pointer-events-auto flex md:translate-y-0 md:opacity-100 translate-x-0' 
                        : 'opacity-0 pointer-events-none md:-translate-y-[100px] md:opacity-0 translate-x-full md:translate-x-0'}
                `}
            >
                <nav>
                    <ul className="flex flex-col gap-y-2">
                        {/* This will be turned into a Link when Router added to App.js */}
                        <li><Link>For sale</Link></li>
                        <li><Link>To Rent</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
        </>
    )
}
