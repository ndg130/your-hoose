import React, { useContext} from 'react'
import SimpleHeader from '../components/SimpleHeader'
import SearchHeader from '../components/SearchHeader'
import PropertyCard from '../components/PropertyCard';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { PropertiesContext } from '../context/properties';

import PropertyCardSkeleton from '../components/Skeletons/PropertyCardSkeleton';
import SignInPromptBanner from '../components/SignInPromptBanner';
import ContentLinkCard from '../components/ContentLinkCard';
export default function HomePage() {


     const { properties, loading, error } = useContext(PropertiesContext);
 
    return (
        <div className='py-10 px-4 lg:px-6'>
            <SearchHeader />
            <SignInPromptBanner />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-x-5 max-w-7xl mx-auto'>
                <ContentLinkCard 
                    to={"/"} 
                    header="Sold house prices" 
                    description="Check what a home sold for plus photos, floorplans and local area insights."
                    linkText="Search house prices"
                    image="https://media.rightmove.co.uk/sold-prices-pod-image.jpeg"
                />
                <ContentLinkCard 
                    to={"/"} 
                    header="What are the current UK mortgage rates?" 
                    description="Check the average 2 and 5-year fixed rates for a range of deposit sizes."
                    linkText="Take a look"
                    image="https://www.rightmove.co.uk/news/content/uploads/2025/02/HadleighTownhousesResized-740x400.jpg"
                />
                <ContentLinkCard 
                    to={"/"} 
                    header="10 mistakes adding £100s to your energy bill" 
                    description="Simple changes and tips that could save you money."
                    linkText="Take a look"
                    image="https://www.rightmove.co.uk/news/content/uploads/2024/10/HeroAdobeStock-740x400.jpg"
                />
            </div>
        </div>
    )
}
