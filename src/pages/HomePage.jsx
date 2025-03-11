import React, { useContext} from 'react'
import SimpleHeader from '../components/SimpleHeader'
import SearchHeader from '../components/SearchHeader'
import PropertyCard from '../components/PropertyCard';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { PropertiesContext } from '../context/properties';

import PropertyCardSkeleton from '../components/Skeletons/PropertyCardSkeleton';
export default function HomePage() {


     const { properties, loading, error } = useContext(PropertiesContext);
 
    return (
        <div className='py-10 px-4 lg:px-6'>
            <SearchHeader />
            <div className='max-w-7xl mx-auto px-6 py-10'>
                {loading ? (
                    <div className='flex flex-col gap-y-5 max-w-3xl items-center justify-center mx-auto'>
                        <PropertyCardSkeleton />
                        <PropertyCardSkeleton />
                        <PropertyCardSkeleton />
                    </div>
                    
                ) : properties.length > 0 ? (
                    <div className='flex flex-col gap-y-5 max-w-3xl items-center justify-center mx-auto'>
                        {properties.map((property, index) => (
                            <PropertyCard key={index} property={property} />
                        ))}
                    </div>
                ) : (
                    <p>No properties available</p> // Fallback UI
                )}
            </div>
        </div>
    )
}
