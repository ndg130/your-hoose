import { Link, useLocation } from "react-router-dom";
import Logo from '../assets/images/yourhoose-logo.png';
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useState } from "react";

export default function Navigation() {
    const [menuVisible, setMenuVisible] = useState(false);
    const basePath = import.meta.env.MODE === 'production' ? '/your-hoose' : '';

    const withoutNavbarRoutes = import.meta.env.VITE_WITHOUT_NAVBAR_ROUTES.split(' ');
    const { pathname } = useLocation();

    const toggleMenu = () => setMenuVisible(!menuVisible);

    const closeMenu = () => setMenuVisible(false);

    if (withoutNavbarRoutes.some((item)=> pathname.includes(item))) return null;

    return (
        <>
        <div className='bg-white relative px-4 py-4 md:py-6 h-[4.375rem] md:h-[5.625rem] z-20 flex border-b border-solid border-gray-300'>
            <div className='max-w-7xl mx-auto flex justify-between items-center relative my-auto w-full'>
                <div className="hidden md:block min-w-10"></div>
                <div className="absolute left-1/2 -translate-x-1/2 flex justify-center">
                    <Link to={`${basePath}`}>
                        <img src={Logo} alt="Logo" className="h-4 sm:h-6"/>
                    </Link>
                </div>
                <div className="flex gap-x-4 ml-auto">
                    <Link className="border-2 border-solid border-accent-dark text-accent-dark hover:text-primary colour-ease cursor-pointer font-medium text-sm px-3 py-1.5 rounded-2xl hidden md:block">Sign In / Register</Link>
                    <button 
                        onClick={toggleMenu} 
                        aria-expanded={menuVisible ? "true" : "false"} 
                        aria-label="Toggle menu"
                    >
                        {!menuVisible ? <HiOutlineMenu className="text-3xl text-accent-dark"/> : <HiX className="text-3xl text-accent-dark"/>}
                    </button>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
            <div
                className={`fixed md:absolute left-0 md:left-auto md:right-5 top-[4.375rem] md:top-[10px] z-[100] 
                    bg-white h-[calc(100%-4.375rem)] md:h-auto md:min-h-[18.75rem] w-full md:w-[18.75rem] 
                    shadow-xl p-4 md:rounded-lg border-t md:border-none border-accent-dark 
                    transform transition-all ease-linear duration-200
                    ${menuVisible 
                        ? 'opacity-100 pointer-events-auto flex md:translate-y-0 md:opacity-100 translate-x-0' 
                        : 'opacity-0 pointer-events-none md:-translate-y-[6.25rem] md:opacity-0 translate-x-full md:translate-x-0'}
                `}
            >
                <nav>
                    <ul className="flex flex-col gap-y-2">
                        <li><Link to={`${basePath}/properties`} onClick={closeMenu}>For sale</Link></li>
                        <li><Link onClick={closeMenu}>To Rent</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
        </>
    );
}