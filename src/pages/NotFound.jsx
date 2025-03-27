import React from 'react'
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
    return (
        <div className='max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center pt-20 min-h-[calc(100vh-90px)]'>
            <div className='p-10 rounded-lg bg-complement-soft max-w-4xl'>
                <h1 className='text-4xl leading-[50px] font-semibold mb-3'>We can&apos;t seem to find the page you&apos;re looking for</h1>
                <p className='mb-5'>The page you&apos;re looking for doesn&apos;t exist. Here are some links you might find useful:</p>
                <ul className='flex flex-col gap-y-2 list-none list-inside'>
                    <li>
                        <a href="/" className='flex items-center gap-x-1 cursor-pointer group'>Home <ArrowRight className="relative left-0 group-hover:left-1 duration-200 transition-all ease-linear" size={20}/></a>
                    </li>
                    <li>
                        <a href="/properties" className='flex items-center gap-x-1 cursor-pointer group'>For Sale <ArrowRight className="relative left-0 group-hover:left-1 duration-200 transition-all ease-linear" size={20}/></a>
                    </li>
                    <li>
                        <a href="/properties" className='flex items-center gap-x-1 cursor-pointer group'>To Rent <ArrowRight className="relative left-0 group-hover:left-1 duration-200 transition-all ease-linear" size={20}/></a>
                    </li>
                </ul>           
            </div>

        </div>
    );
}
