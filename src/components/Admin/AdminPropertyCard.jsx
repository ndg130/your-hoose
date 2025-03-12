import { useRef, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules';
import MoneyFormatter from '../../utils/MoneyFormatter';
import { FaBed, FaShower, FaCamera, FaPhone } from "react-icons/fa6";



export default function AdminPropertyCard({property}) {

    const basePath = import.meta.env.MODE === 'production' ? '/your-hoose' : '';

    const paginationRef = useRef(null);

    const [estateAgent, setEstateAgent] = useState(null);

    useEffect(() => {

        const fetchEstateAgents = async () => {
            const endpoint = import.meta.env.VITE_API_ESTATE_AGENTS_ENDPOINT;

            
            try {
                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                const estateAgentsData = data["estate-agents"] || data; 

                
                // Ensure property is defined and has agent_ref
                if (!property || !property.property.agent_ref) {
                    console.log(property)
                    console.error('Property agent_ref is missing or undefined');
                    return;
                }
        
                // Use find to match the agent name
                const agentLookup = estateAgentsData.find(agentObj => 
                    agentObj.agent.name.toLowerCase() === property.property.agent_ref.toLowerCase()
                );
        
                setEstateAgent(agentLookup);
        
            } catch (error) {
                console.error('Error fetching estate agents:', error);
            }
        }
        fetchEstateAgents();


    }, [property])

    return (
        <Link to={`${basePath}/admin/edit-property/${property.property.id}`} className='propertyCard bg-white rounded-lg shadow-lg flex flex-col md:flex-row mx-6 overflow-hidden'>
            <div className='flex flex-col max-w-[150px] aspect-square'>
                <div className='relative h-full w-full'>
                    {property?.property?.details?.media?.length > 0 ? (
                        <img className="h-full w-full object-cover" src={property.property.details.media[0].url} alt={`Property image 1`} />
                    ) : (
                        <p>Loading images...</p> // Fallback UI
                    )}
                 
                </div>
            </div>
            <div className='px-5'>
                <div to={`${basePath}/properties/${property.property.id}`} className='p-2 group'>
                    {property && (
                        <address className='font-semibold not-italic text-sm text-accent-dark group-hover:underline'>
                            {property.property.address.house_name_number !== "" && property.property.address.house_name_number != "undefined" && property.property.address.house_name_number != "N/A" && property.property.address.house_name_number != "Not specified"  
                                ? property.property.address.house_name_number + ', ' 
                                : "" 
                            }
                            {property.property.address.street_name !== "" ? property.property.address.street_name + ', ' : "" }
                            {property.property.address.postcode_1 !== "" ? property.property.address.postcode_1 + ' ' : "" }
                            {property.property.address.postcode_2 !== "" ? property.property.address.postcode_2 + ' ' : "" }
                        </address>                    
                    )}
                    <div className='flex gap-x-4 my-1.5'>
                        <span className='text-sm'>{property.property.details.property_type}</span>
                        <span className='text-sm flex gap-x-2 items-center'><FaBed className='text-base'/> {property.property.details.bedrooms}</span>
                        <span className='text-sm flex gap-x-2 items-center'><FaShower className='text-base'/> {property.property.details.bathrooms}</span>
                    </div>
                </div>
                <div className='flex pb-6 items-center gap-x-2 hidden'>
                    {estateAgent !== null && (
                        <>
                        <img src={estateAgent.agent.logo} className='max-h-[2.5rem] max-w-[5.75rem] h-full object-contain'/>
                        <div className='flex flex-col ml-5 md:ml-0'>
                            <div className="text-sm font-medium text-accent-dark" href={`tel:${estateAgent.agent.telephone}`}>
                                <span className='hidden md:block'>{estateAgent.agent.telephone}</span>
                                <span className='flex md:hidden text-base gap-x-2'><FaPhone className='text-lg md:hidden'/> Call</span>
                            </div>
                            <p className="text-xs font-medium text-gray-600 hidden md:block">Local call rate</p>
                        </div>
                        </>
                    )}
                </div>          
            </div>

        </Link>
    )
}

AdminPropertyCard.propTypes = {
    property: PropTypes.object
}
