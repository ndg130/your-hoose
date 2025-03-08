import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules';
import MoneyFormatter from '../utils/MoneyFormatter';
import { FaBed, FaShower, FaCamera, FaPhone } from "react-icons/fa6";



export default function PropertyCard({property}) {
    const paginationRef = useRef(null);

    const [estateAgent, setEstateAgent] = useState(null);

    useEffect(() => {

        const fetchEstateAgents = async () => {
            const localEndpoint = 'http://localhost:4005/estate-agents';
            const liveEndpoint = 'https://ndg130.github.io/your-hoose/estate-agents.json';
            
            try {
                const response = await fetch(liveEndpoint);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                
                // Ensure property is defined and has agent_ref
                if (!property || !property.property.agent_ref) {
                    console.log(property)
                    console.error('Property agent_ref is missing or undefined');
                    return;
                }
        
                // Use find to match the agent name
                const agentLookup = data["estate-agents"].find(agentObj => 
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
        <div className='propertyCard bg-white rounded-lg shadow-lg flex flex-col md:flex-row mx-6'>
            <div className='flex flex-col min-w-[265px] max-w-[90vw] md:w-[265px]'>
                <div className='relative'>
                    <div className="swiper-pagination-property-card rounded-lg bg-accent-dark text-accent-light text-xs flex gap-x-5 px-2 py-0.5 items-center">
                        <div className='flex items-center gap-x-2'><FaCamera className='text-base'/><span ref={paginationRef} className='pagination-count'></span></div>
                    </div>
                    {property?.property?.details?.media?.length > 0 ? (
                        <Swiper
                            modules={[Pagination, Navigation]}
                            slidesPerView={1}
                            spaceBetween={20}
                            loop={true}
                            pagination={{
                                el: paginationRef.current,
                                type: 'fraction',
                            }}
                            navigation={{clickable: true}}
                            breakpoints={{
                                640: { slidesPerView: 1, spaceBetween: 20 },
                                768: { slidesPerView: 1, spaceBetween: 20 },
                                1024: { slidesPerView: 1, spaceBetween: 20 },
                            }}
                            className='rounded-tl-lg w-full object-cover group-hover:opacity-75 min-h-[200px] xs:min-h-[250px] sm:min-h-[300px] md:min-h-0'
                        >
                            {property.property.details.media.map((media, index) => (
                                <SwiperSlide
                                    key={index}
                                    className='bg-orange-600 '
                                >
                                    <img className="h-full w-full object-cover" src={media.url} alt={`Property image ${index + 1}`} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <p>Loading images...</p> // Fallback UI
                    )}
                 
                </div>
                <div className='min-h-[70px] flex items-center bg-accent-light/25 text-accent-dark h-full'>
                    <p className='w-full text-xl font-semibold px-3 py-1'>{typeof property.property.price.amount === 'number' ? <MoneyFormatter amount={property.property.price.amount} /> : property.property.price.amount}</p>
                </div>
            </div>
            <div className='px-5'>
                <Link to={`/properties/${property.property.id}`}className='p-2 group'>
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
                    <div className='mb-5'>
                        <p className='line-clamp-4 text-xs text-gray-600'>{property.property.details.description}</p>
                    </div>
                    <div>
                        {property && property.property.details.status !== 'Available' && (
                            <p className='flex text-sm mb-2 bg-primary text-accent-dark font-semibold w-fit px-3 py-0.5 rounded-lg'>{property.property.details.status}</p>
                        )}
                        <p className='text-sm line-clamp-1 font-medium text-primary'>Added on {property.property.listing_date} <span className='hidden md:inline'>by {property.property.agent_ref}</span></p>
                    </div>
                </Link>
                <div className='flex pb-6 items-center gap-x-2'>
                    {estateAgent !== null && (
                        <>
                        <img src={estateAgent.agent.logo} className='max-h-[40px] max-w-[92px] h-full object-contain'/>
                        <div className='flex flex-col ml-5 md:ml-0'>
                            <a className="text-sm font-medium text-accent-dark" href={`tel:${estateAgent.agent.telephone}`}>
                                <span className='hidden md:block'>{estateAgent.agent.telephone}</span>
                                <span className='flex md:hidden text-base gap-x-2'><FaPhone className='text-lg md:hidden'/> Call</span>
                            </a>
                            <p className="text-xs font-medium text-gray-600 hidden md:block">Local call rate</p>
                        </div>
                        </>
                    )}
                </div>          
            </div>

        </div>
    )
}

PropertyCard.propTypes = {
    property: PropTypes.object
}
