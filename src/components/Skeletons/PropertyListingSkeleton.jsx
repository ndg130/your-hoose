import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function PropertyListingSkeleton() {
  return (
    <div className=''>
        <div className="w-full h-[16rem] max-h-[21.875rem] md:max-h-none md:h-[26.563rem] lg:h-[31.25rem]">
        <Skeleton className="h-full w-full" />
        </div>
        <div className='flex mt-3 w-full gap-x-5'>
        <div className='w-[calc(100%-21.875] flex-1'>
            <Skeleton height={24} width={300} className='mb-2' />
            <Skeleton height={16} width={150} className='mb-1' />
            <Skeleton height={32} width={120} className='mb-3' />

            <div id='details' className='grid grid-cols-2 sm:flex gap-10 border-t border-solid border-neutral-dark/10 py-4'>
            {Array(4).fill('').map((_, index) => (
                <div key={index} className='flex flex-col'>
                <Skeleton height={12} width={100} className='mb-1' />
                <Skeleton height={20} width={80} />
                </div>
            ))}
            </div>

            <div className='border-t border-solid border-neutral-dark/10 py-4'>
            <Skeleton height={24} width={200} className='mb-3' />
            <Skeleton count={5} className='mb-8' />
            <Skeleton height={24} width={200} className='mb-3' />
            <Skeleton count={3} />
            </div>
        </div>

        <aside className='hidden lg:block lg:col-span-2 relative w-[21.875rem]'>
            <div className='sticky top-[10px] shadow-lg rounded-lg p-4'>
            <Skeleton height={12} width={100} className='mb-2' />
            <Skeleton height={16} width={180} className='mb-1' />
            <Skeleton height={12} width={150} className='mb-4' />
            <Skeleton height={50} width={150} className='mb-5' />
            <Skeleton height={40} width='100%' className='rounded-lg' />
            </div>
        </aside>
        </div>
    </div>
  );
}
