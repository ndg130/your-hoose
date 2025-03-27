import { useState, useContext } from 'react';
import SimpleHeader from '../components/SimpleHeader';
import PropertyCard from '../components/PropertyCard';
import PropertyCardSkeleton from '../components/Skeletons/PropertyCardSkeleton';
import { PropertiesContext } from '../context/properties';
import { SlidersHorizontal, X } from 'lucide-react';

export default function Properties() {
    const { properties, loading, error } = useContext(PropertiesContext);

/*     let number = 0;
    let maxNumber = 19;
    
    let media = [];
    
    for (let i = 0; maxNumber > i; i++) {
      // Format the index to two digits if it's less than 10
      let current = (i < 10) ? '0' + i : i;
    
      // The provided URL
      const url = `https://media.rightmove.co.uk/47k/46041/158585573/46041_QRW250046_IMG_00_0000.jpeg`;
    
      // Split the URL into three parts based on 'IMG_'
      const [partOne, partTwoAndThree] = url.split('IMG_');
      const [partTwo, partThree] = partTwoAndThree.split('_');
    
      // Now you can use the dynamic 'current' value as partTwo
      const updatedUrl = `${partOne}IMG_${current}_${partThree}`;
    
      // Create the image object
      const image = {
        type: 'image',
        url: updatedUrl,
      };
    
      // Push the image object into the media array
      media.push(image);
    } */

    const [filterMenuOpen, setFilterMenuOpen] = useState(false);
    const [filterApplied, setFiltersApplied] = useState(false);

    const initialFilters = {
        minBedrooms: 0,
        maxBedrooms: 0,
        minBathrooms: 0,
        maxBathrooms: 0,
    };

    const [filters, setFilters] = useState(initialFilters);

    const filteredProperties = properties?.filter(property => 
        (!filters.minBedrooms || property.property.details.bedrooms >= filters.minBedrooms) &&
        (!filters.maxBedrooms || property.property.details.bedrooms <= filters.maxBedrooms) &&
        (!filters.minBathrooms || property.property.details.bathrooms >= filters.minBathrooms) &&
        (!filters.maxBathrooms || property.property.details.bathrooms <= filters.maxBathrooms)
    ) ?? [];

    const toggleFilterMenu = () => {
    setFilterMenuOpen(prev => !prev);
    };

    const handleFilters = (e, field) => {
        setFilters(prev => ({
            ...prev,
            [field]: Number(e.target.value),  // Ensure numeric comparison
        }));
    };

    const resetFilters = () => {
        setFilters(initialFilters); // Reset filters to initial state
    };

    return (
        <div className='pb-10'>
            <SimpleHeader 
                headerText="Latest listings for NE39" 
                style="dark" 
                backgroundImage="https://www.simpsonandbrown.co.uk/files/content/345_rotator1.jpg"
            />
            <div className='max-w-7xl mx-auto lg:px-6 pt-0 pb-10 lg:py-10 flex flex-col lg:flex-row relative gap-x-6'>
            {loading ? (
                <div className='flex flex-col gap-y-5 max-w-5xl flex-1 px-6 lg:px-0'>
                    <p>Loading properties...</p>
                    <PropertyCardSkeleton />
                    <PropertyCardSkeleton />
                    <PropertyCardSkeleton />
                </div>
            ) : error ? (
                <p className="text-center text-red-500 max-w-5xl flex-1 px-4 lg:px-0">Failed to load properties: {error}</p>
            ) : filteredProperties.length > 0 ? (
                <div className='flex flex-col gap-y-5 max-w-5xl flex-1 px-4 lg:px-0'>
                    <p className='sticky top-0 left-0 w-full bg-neutral-light py-3 z-50'>Showing <span className='font-semibold'>{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'property' : 'properties'}</p>
                    {filteredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            ) : (
                <p className='text-left max-w-5xl flex-1 px-6 lg:px-0'>No properties match your filters</p>
            )}
                <div className={`order-first lg:order-last p-4 mb-5 bg-white lg:min-w-[250px] lg:w-[250px] shadow-md w-full z-50 sticky top-0 left-0 lg:h-screen`}>

                    <button 
                    className='w-full flex lg:hidden justify-between items-center'
                    onClick={() => toggleFilterMenu()}
                    >
                        <p className='text-base pt-0.5 font-semibold text-accent-dark'>Filters</p>
                        <SlidersHorizontal className={`${!filterMenuOpen ? 'block' : 'hidden'} text-accent-dark`}/>
                        <X className={`${filterMenuOpen ? 'block' : 'hidden'} text-accent-dark`}/>

                    </button>
                    {/* Collapsible Menu */}
                    <div className={`${filterMenuOpen ? 'mt-2 lg:mt-0 lg:block' : 'hidden lg:block'}`}>
                        <p className='hidden lg:block mb-2 text-lg font-semibold text-accent-dark'>Filters</p>
                        <div className="space-y-4">
                            <div className='grid grid-cols-2 gap-y-2 gap-x-2'>
                                <p className='col-span-2'>Bedrooms</p>
                                <div className='inputWrapper border px-2 py-1 rounded-md col-span-2 lg:col-span-1'>
                                    <label className="block mb-0.5 text-[10px] font-medium text-gray-700">Minimum</label>
                                    <div className='selectWrapper'>
                                        <select className="w-full" onChange={(e) => handleFilters(e, "minBedrooms")} value={filters.minBedrooms}>
                                            <option value="0">Any</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>  
                                    </div>
                                </div>
                                <div className='inputWrapper border px-2 py-1 rounded-md col-span-2 lg:col-span-1'>
                                    <label className="block mb-0.5 text-[10px] font-medium text-gray-700">Maximum</label>
                                    <div className='selectWrapper'>
                                        <select className="w-full" onChange={(e) => handleFilters(e, "maxBedrooms")} value={filters.maxBedrooms}>
                                            <option value="0">Any</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>  
                                    </div>
                                </div>
                                <p className='col-span-2 mt-2'>Bathrooms</p>
                                <div className='inputWrapper border px-2 py-1 rounded-md col-span-2 lg:col-span-1'>
                                    <label className="block mb-0.5 text-[10px] font-medium text-gray-700">Minimum</label>
                                    <div className='selectWrapper'>
                                        <select className="w-full" onChange={(e) => handleFilters(e, "minBathrooms")} value={filters.minBathrooms}>
                                            <option value="0">Any</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>  
                                    </div>
                                </div>
                                <div className='inputWrapper border px-2 py-1 rounded-md col-span-2 lg:col-span-1'>
                                    <label className="block mb-0.5 text-[10px] font-medium text-gray-700">Maximum</label>
                                    <div className='selectWrapper'>
                                        <select className="w-full" onChange={(e) => handleFilters(e, "maxBathrooms")} value={filters.maxBathrooms} >
                                            <option value="0">Any</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>  
                                    </div>
                                </div>
                            </div>


                            <div className="flex justify-between items-center">
                                <button 
                                    className="px-5 py-3 bg-complement-medium w-full text-center rounded-lg font-semibold hover:text-white hover:bg-complement-deep transition-colours duration-200 ease-linear"
                                    onClick={resetFilters}
                                >Clear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}