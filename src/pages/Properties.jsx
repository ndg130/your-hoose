import { useState, useContext, useRef, useEffect } from 'react';
import SimpleHeader from '../components/SimpleHeader';
import PropertyCard from '../components/PropertyCard';
import PropertyCardSkeleton from '../components/Skeletons/PropertyCardSkeleton';
import { PropertiesContext } from '../context/properties';
import { SlidersHorizontal, X, ArrowLeft, ArrowRight } from 'lucide-react';
import ReactPaginate from "react-paginate";

export default function Properties() {
    const { properties, loading, error } = useContext(PropertiesContext);

    const [filterMenuOpen, setFilterMenuOpen] = useState(false);

    const listingsRef = useRef(null);

    const initialFilters = {
        minBedrooms: 0,
        maxBedrooms: 0,
        minBathrooms: 0,
        maxBathrooms: 0,
        minPrice: 0,
        maxPrice: ""
    };

    const [filters, setFilters] = useState(initialFilters);
    const [sortOption, setSortOption] = useState("");

    const filteredProperties = (properties || [])
    .filter(property => 
        (!filters.minBedrooms || property.property.details.bedrooms >= filters.minBedrooms) &&
        (!filters.maxBedrooms || property.property.details.bedrooms <= filters.maxBedrooms) &&
        (!filters.minBathrooms || property.property.details.bathrooms >= filters.minBathrooms) &&
        (!filters.maxBathrooms || property.property.details.bathrooms <= filters.maxBathrooms) &&
        (!filters.minPrice || property.property.price.amount >= filters.minPrice) &&
        (!filters.maxPrice || property.property.price.amount <= filters.maxPrice)
    )
    .sort((a, b) => {
        if (sortOption === 'price-asc') {
            return a.property.price.amount - b.property.price.amount;
        } else if (sortOption === 'price-desc') {
            return b.property.price.amount - a.property.price.amount;
        } else {
            return 0;
        }
    });

    // Pagination
    const [page, setPage] = useState(0);
    const n = 10; // properties per page
    const startIndex = page * n;
    const endIndex = startIndex + n;
    const currentProperties = filteredProperties.slice(startIndex, endIndex);


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

    const handleSort = (value) => {
        setSortOption(value);
    };

    useEffect(() => {
        setPage(0);
      }, [filters, sortOption]);

    return (
        <div className='pb-10'>
            <SimpleHeader 
                headerText="Latest listings for NE39" 
                style="dark" 
                backgroundImage="https://www.simpsonandbrown.co.uk/files/content/345_rotator1.jpg"
            />
            <div className='max-w-7xl mx-auto lg:px-6 pt-0 pb-10 lg:py-10 flex flex-col lg:flex-row relative gap-x-6'>
                <div className='w-full'>
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
                    <>
                        <div ref={listingsRef} className='flex flex-col gap-y-5 max-w-5xl flex-1 px-4 lg:px-0'>
                        <div className='flex justify-between'>
                            <p className='sticky top-0 left-0 w-full lg:w-[101%] bg-neutral-light py-3 z-50'>
                                Showing <span className='font-semibold'>{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'property' : 'properties'}
                            </p>
                            <div className='sortWrapper border rounded-md flex items-center'>
                                <select id="sortSelect" className='h-full px-2 py-1 rounded-md text-sm overflow-hidden' onChange={(e) => handleSort(e.target.value)}>
                                    <option value="">Sort By</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>   
                            </div>
                  
                        </div>

                        {currentProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                        </div>
                        {filteredProperties.length > n && (
                            <ReactPaginate
                            containerClassName={"pagination"}
                            pageClassName={"page-item"}
                            activeClassName={"active"}
                            onPageChange={(event) => {
                                setPage(event.selected);
                                listingsRef.current?.scrollIntoView({ behavior: 'smooth' });
                              }}
                            pageCount={Math.ceil(filteredProperties.length / n)}
                            breakLabel="..."
                            previousLabel={
                                <ArrowLeft size={20} className='hover:text-accent-warm colour-ease'/>
                            }
                            nextLabel={
                                <ArrowRight size={20} className='hover:text-accent-warm colour-ease'/>
                            }
                            />                            
                        )}
                    </>
                    ) : (
                    <p className='text-left max-w-5xl flex-1 px-6 lg:px-0'>No properties match your filters</p>
                    )}
                </div>
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
                                    <label for="maxBedroomsFilter" className="block mb-0.5 text-[10px] font-medium text-gray-700">Maximum</label>
                                    <div className='selectWrapper'>
                                        <select id="maxBedroomsFilter" className="w-full" onChange={(e) => handleFilters(e, "maxBedrooms")} value={filters.maxBedrooms}>
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
                                <p className='col-span-2 mt-2'>Price</p>
                                <div className='inputWrapper border px-2 py-1 rounded-md col-span-2'>
                                    <label className="block mb-0.5 text-[10px] font-medium text-gray-700">Minimum</label>
                                    <div className='selectWrapper'>
                                        <select className="w-full" onChange={(e) => handleFilters(e, "minPrice")} value={filters.minPrice}>
                                            <option value="0">Any</option>
                                            <option value="50000">£50,000</option>
                                            <option value="75000">£75,000</option>
                                            <option value="100000">£100,000</option>
                                            <option value="125000">£125,000</option>
                                            <option value="150000">£150,000</option>
                                            <option value="175000">£175,000</option>
                                            <option value="200000">£200,000</option>
                                            <option value="225000">£225,000</option>
                                            <option value="250000">£250,000</option>
                                            <option value="275000">£275,000</option>
                                            <option value="300000">£300,000</option>
                                            <option value="325000">£325,000</option>
                                            <option value="350000">£350,000</option>
                                            <option value="375000">£375,000</option>
                                            <option value="400000">£400,000</option>
                                            <option value="425000">£425,000</option>
                                            <option value="450000">£450,000</option>
                                            <option value="475000">£475,000</option>
                                            <option value="500000">£500,000</option>
                                        </select>  
                                    </div>
                                </div>
                                <div className='inputWrapper border px-2 py-1 rounded-md col-span-2'>
                                    <label className="block mb-0.5 text-[10px] font-medium text-gray-700">Maximum</label>
                                    <div className='selectWrapper'>
                                        <select className="w-full" onChange={(e) => handleFilters(e, "maxPrice")} value={filters.maxPrice}>
                                            <option value="0">Any</option>
                                            <option value="50000">£50,000</option>
                                            <option value="75000">£75,000</option>
                                            <option value="100000">£100,000</option>
                                            <option value="125000">£125,000</option>
                                            <option value="150000">£150,000</option>
                                            <option value="175000">£175,000</option>
                                            <option value="200000">£200,000</option>
                                            <option value="225000">£225,000</option>
                                            <option value="250000">£250,000</option>
                                            <option value="275000">£275,000</option>
                                            <option value="300000">£300,000</option>
                                            <option value="325000">£325,000</option>
                                            <option value="350000">£350,000</option>
                                            <option value="375000">£375,000</option>
                                            <option value="400000">£400,000</option>
                                            <option value="425000">£425,000</option>
                                            <option value="450000">£450,000</option>
                                            <option value="475000">£475,000</option>
                                            <option value="500000">£500,000</option>
                                        </select>  
                                    </div>
                                </div>
                            </div>


                            <div className="flex justify-between items-center">
                                <button 
                                    className="px-5 py-3 bg-complement-medium w-full text-center rounded-lg font-semibold hover:text-white hover:bg-complement-deep transition-colours duration-200 ease-linear"
                                    onClick={() => {
                                        resetFilters();
                                        setFilterMenuOpen(false);
                                    }}
                                >Clear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}