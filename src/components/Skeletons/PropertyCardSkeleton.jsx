import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FaBed, FaShower, FaCamera, FaPhone } from "react-icons/fa6";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function PropertyCard() {


    return (
        <div className='propertyCard bg-white rounded-lg shadow-lg flex flex-col md:flex-row mx-6 w-full'>
            <div className='flex flex-col min-w-[16.563rem] max-w-[90vw] md:w-[16.563rem]'>
                <div className='relative'>
                    <div>
                        <Skeleton height={199} width="100%"/>
                    </div>
                </div>
                <div className='min-h-[4.375rem] flex items-center bg-accent-light/25 text-accent-dark h-full'>
                    <p className='w-full text-xl font-semibold px-3 py-1'><Skeleton width={100} /></p>
                </div>
            </div>
            <div className='px-5'>
                <div className='p-2 group'>
                    <Skeleton width={250} height={15} />
                    <div className='flex gap-x-4 my-1.5'>
                        <span className='text-sm'><Skeleton width={80}/></span>
                        <span className='text-sm flex gap-x-2 items-center'><Skeleton width={20} /></span>
                        <span className='text-sm flex gap-x-2 items-center'><Skeleton width={20} /></span>
                    </div>
                    <div className='mb-5'>
                        <p className='line-clamp-4 text-xs text-gray-600'><Skeleton count={3} /></p>
                    </div>
                    <div>
                        
                            <p className='flex text-sm mb-2  text-accent-dark font-semibold w-fit px-3 py-0.5 rounded-lg'><Skeleton width={100} height={20} /></p>
                        
                    </div>
                </div>
                <div className='flex pb-6 items-center gap-x-2'>
                   
                        <>
                            <Skeleton circle width={40} height={40} />
                            <div className='flex flex-col ml-5 md:ml-0'>
                                <Skeleton width={100} height={15} />
                                <Skeleton width={80} height={10} />
                            </div>
                        </>
                    
                </div>          
            </div>

        </div>
    )
}

PropertyCard.propTypes = {
    property: PropTypes.object
}
