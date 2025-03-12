import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
export default function ContentLinkCard({ to, image, header, description, linkText }) {
  return (
    <Link to={to} className='flex flex-row md:flex-col rounded-lg shadow-md overflow-hidden group hover:ring-2 hover:ring-solid hover:ring-complement-deep ring-inside'>
        <img className="hidden md:block h-[10rem] lg:h-[12rem] object-cover" src={image} alt="" />
        <div className='flex flex-col px-4 py-3'>
            <h3 className='text-base font-semibold text-accent-dark mb-3'>{header}</h3>
            <p className='hidden md:block text-sm text-gray-700 flex-grow mb-10'>{description}</p>
            <span className='flex items-center text-complement-deep font-semibold'>{linkText} <FaArrowRight className='relative text-base left-1 transform transition-all duration-200 ease-linear group-hover:left-2'/></span>
        </div>
    </Link>
  )
}
