import { useState, useEffect, useContext } from 'react' 
import Breadcrumbs from '../components/Breadcrumbs'

import { FaBed, FaShower, FaCamera, FaHouse, FaChevronLeft, FaChevronRight, FaArrowLeft } from "react-icons/fa6";

import { MdGridOn } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import PropertyMap from '../components/PropertyMap';

import MoneyFormatter from '../utils/MoneyFormatter';
import LightBox from '../components/LightBox';
import PropertyListingSkeleton from '../components/Skeletons/PropertyListingSkeleton';

import { PropertiesContext } from '../context/properties';
import { EstateAgentsContext } from '../context/estateAgents';

export default function PropertyListing() {

    const basePath = import.meta.env.MODE === 'production' ? '/your-hoose' : '';

    const { id } = useParams();
    const { properties, loading: propertiesLoading, error: propertiesError } = useContext(PropertiesContext);
    const { estateAgents, loading: estateAgentsLoading, error: estateAgentsError } = useContext(EstateAgentsContext);

    const [property, setProperty] = useState(null);
    const [estateAgent, setEstateAgent] = useState(null);
    const [lightBoxVisible, setLightBoxVisible] = useState(false);
    const [photoGroup, setPhotoGroup] = useState([]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);


    const handleNext = () => setActiveImageIndex(prev => (prev + 1) % photoGroup.length);
    const handlePrevious = () => setActiveImageIndex(prev => (prev - 1 + photoGroup.length) % photoGroup.length);

    

    useEffect(() => {

        if(properties !== null) {
            const findProperty = properties.find(property => Number(property.property.id) === Number(id));
        
            if (findProperty) {
                setProperty(findProperty);
                setPhotoGroup(findProperty.property.details.media || []);
            } else {
                console.warn(`Property with ID ${id} not found.`);
            }            
        }


    }, [id, properties])

    useEffect(() => {
        if(property !== null){
        const agentLookup = estateAgents.find(agentObj => 
            agentObj.agent.name.toLowerCase() === property.property.agent_ref.toLowerCase()
        );

        setEstateAgent(agentLookup);
        }
    }, [property, estateAgents])


    return (
    <>
        <div className='flex items-center px-4 py-3 max-w-7xl mx-auto'>
            <Link to={`${basePath}/properties`} className='flex gap-x-2 items-center text-complement-deep text-sm font-medium hover:underline'>
                <FaArrowLeft className='text-gray-800 text-base'/> Back to listings
            </Link>
        </div> 
        <div className='propertyListing max-w-7xl mx-auto px-4 md:px-6 py-10 w-full'>
            <div className=''>
                {propertiesLoading && estateAgentsLoading ? (
                    <PropertyListingSkeleton />
                ) : property && photoGroup ? (
                    <>
                    <div className='group relative grid md:grid-cols-3 lg:grid-cols-6 md:grid-rows-2 grid-cols-1 grid-rows-1 max-h-[21.875rem] md:max-h-none md:h-[26.563rem] lg:h-[31.25rem] rounded-lg overflow-hidden gap-2'>
                        <img onClick={() => setLightBoxVisible(true)} className="md:col-span-2 lg:col-span-4 row-span-2 h-full w-full object-cover" src={`${property.property.details.media[activeImageIndex % property.property.details.media.length].url}`} alt="" />
                        <img onClick={() => setLightBoxVisible(true)} className="hidden md:block md:col-span-1 lg:col-span-2 row-span-1 h-full w-full object-cover" src={`${property.property.details.media[(activeImageIndex + 1) % property.property.details.media.length].url}`} alt="" />
                        <img onClick={() => setLightBoxVisible(true)} className="hidden md:block md:col-span-1 lg:col-span-2 row-span-1 h-full w-full object-cover" src={`${property.property.details.media[(activeImageIndex + 2) % property.property.details.media.length].url}`} alt="" />
                        <div onClick={() => setLightBoxVisible(true)} className="rounded-lg bg-accent-dark text-accent-light text-xs flex gap-x-5 px-2 py-0.5 items-center bottom-[10px] right-[10px] absolute">
                            <div className='flex items-center gap-x-2'><FaCamera className='text-base'/><span className='pagination-count'>{activeImageIndex + 1} / {property.property.details.media.length}</span></div>
                        </div>
                        <div onClick={() => setLightBoxVisible(true)} className='absolute w-full h-full inset-0 z-10 opacity-0 transition-opacity duration-200 ease-linear group-hover:opacity-100'>
                            <div className='h-full absolute left-0 w-[6.25rem] primary-gradient-bg-left' onClick={(e) => { e.stopPropagation(); handlePrevious(); }}>
                                <button className="absolute left-[10px] transform -translate-y-1/2 top-1/2"><FaChevronLeft className='text-white text-5xl hover:text-accent-dark transition-colors duration-200 ease-linear' /></button>
                            </div>
                            <div className='h-full absolute right-0 w-[6.25rem] primary-gradient-bg-right' onClick={(e) => { e.stopPropagation(); handleNext(); }}>
                                <button className="absolute right-[10px] transform -translate-y-1/2 top-1/2"><FaChevronRight className='text-white text-5xl hover:text-accent-dark transition-colors duration-200 ease-linear'/></button>                        
                            </div>
                        </div>
                    </div>
                    <div className='flex mt-3 w-full gap-x-5'>
                        <div className='w-[calc(100%-21.875] flex-1'>
                            <h1 className='text-base font-semibold text-accent-dark mb-2'>
                                {property.property.address.house_name_number !== "" && property.property.address.house_name_number != "undefined" && property.property.address.house_name_number != "N/A" && property.property.address.house_name_number != "Not specified"  
                                    ? property.property.address.house_name_number + ', ' 
                                    : "" 
                                }
                                {property.property.address.street_name !== "" ? property.property.address.street_name + ', ' : "" }
                                {property.property.address.postcode_1 !== "" ? property.property.address.postcode_1 + ' ' : "" }
                                {property.property.address.postcode_2 !== "" ? property.property.address.postcode_2 + ' ' : "" }
                            </h1>
                            <div className='flex'>
                                <div className='w-full'>
                                    {property.property.price.qualifier !== "" && (
                                        <p className='capitalize text-xs font-medium text-gray-600'>{property.property.price.qualifier}</p>
                                    )}
                                    <p className='font-semibold text-lg mb-3'><MoneyFormatter amount={property.property.price.amount}/></p>                                      
                                </div>
                                <div className='lg:hidden'>
                                    {estateAgent !== null && (
                                        <img src={`${estateAgent.agent.logo}`} alt="" className='max-h-[6.25rem] mb-10'/>
                                    )}
                                    
                                </div>
                            </div>

                            <div id="details" className='grid grid-cols-2 sm:flex gap-10 border-t border-solid border-neutral-dark/10 py-4'>
                                <div className='flex flex-col'>
                                    <p className='uppercase text-xs font-medium text-gray-500 relative top-[1px] mb-1'>Property Type</p>
                                    <p className='flex gap-x-2 items-center text-base font-medium'><FaHouse className='text-complement-medium text-lg'/> <span className='relative top-[2px]'>{property.property.details.property_type}</span></p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='uppercase text-xs font-medium text-gray-500 relative top-[1px] mb-1'>Bedrooms</p>
                                    <p className='flex gap-x-2 items-center text-base font-medium'><FaBed className='text-complement-medium text-lg'/> <span className='relative top-[2px]'>{property.property.details.bedrooms}</span></p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='uppercase text-xs font-medium text-gray-500 relative top-[1px] mb-1'>Bathrooms</p>
                                    <p className='flex gap-x-2 items-center text-base font-medium'><FaShower className='text-complement-medium text-lg'/> <span className='relative top-[2px]'>{property.property.details.bathrooms}</span></p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='uppercase text-xs font-medium text-gray-500 relative top-[1px] mb-1'>Size</p>
                                    <p className='flex gap-x-2 items-center text-base font-medium'><MdGridOn className='text-complement-medium text-lg'/> <span className='relative top-[2px]'>Ask agent</span></p>
                                </div>
                            </div>
                            <div className='border-t border-solid border-neutral-dark/10 py-4'>
                                <h2 className='text-xl font-medium text-accent-dark mb-3'>Key features</h2>
                                {property && (
                                    <ul className='list-disc list-inside flex flex-col gap-y-3 mb-8'>
                                        {property.property.details.features.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                                <h2 className='text-xl font-medium text-accent-dark mb-3'>Description</h2>
                                {property && (
                                    <p>{property.property.details.description}</p>
                                )}
                            </div>

                            <div>
                                {/* <PropertyMap latitude={51.5074} longitude={-0.1278} />  */}
                            </div>
                        </div>
                        <aside className='hidden lg:block lg:col-span-2 relative w-[21.875rem]'>
                            <div className='sticky top-[10px]'>
                                <div className='shadow-lg rounded-lg p-4'>
                                    <p className='text-xs text-gray-500 uppercase'>Marketed by</p>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            {estateAgent !== null && (
                                                <>
                                                <p className='text-sm font-semibold pb-2 text-accent-dark'>{estateAgent.agent.name}</p>
                                                <p className='text-xs text-gray-500'>
                                                    {estateAgent.agent.address.line1 && estateAgent.agent.address.line1 !== "" ? estateAgent.agent.address.line1 + ', ' : ""}
                                                    {estateAgent.agent.address.line2 && estateAgent.agent.address.line2 !== "" ? estateAgent.agent.address.line2 + ', ' : ""}
                                                    {estateAgent.agent.address.city && estateAgent.agent.address.city !== "" ? estateAgent.agent.address.city + ', ' : ""}
                                                    {estateAgent.agent.address.postcode && estateAgent.agent.address.postcode !== "" ? estateAgent.agent.address.postcode : ""}
                                                </p>                                                
                                                </>
                                            )}
                                            
                                            
                                        </div>
                                        {estateAgent !== null && (
                                        <img src={estateAgent.agent.logo} className="w-auto max-h-[5rem] ml-auto" alt="" />
                                        )}
                                        {estateAgent !== null && (
                                        <div className='bg-neutral-medium col-span-2 flex justify-center p-10 rounded-lg mt-5'>
                                            <a href={`tel:${estateAgent.agent.telephone}`} className='px-5 py-3 bg-complement-medium w-full text-center rounded-lg font-semibold hover:text-white hover:bg-complement-deep transition-colours duration-200 ease-linear'>Call this agent</a>
                                        </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                    </>
                ) : (
                    <p>Loading property details...</p>
                )}                
            </div>
        </div>
        {property && lightBoxVisible && (
            <LightBox 
                property={property}
                photoGroup={photoGroup}
                onClose={() => setLightBoxVisible(false)}
                onPrevious={() => setActiveImageIndex(activeImageIndex - 1)}
                onNext={() => setActiveImageIndex(activeImageIndex + 1)}
                activeImageIndex={activeImageIndex}
                setActiveImageIndex={setActiveImageIndex}
            />
        )}
        
    </>

    )
}
