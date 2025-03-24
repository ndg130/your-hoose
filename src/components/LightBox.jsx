import { useState } from 'react'
import PropTypes from 'prop-types'
import { FaCircleChevronLeft, FaCircleChevronRight, FaArrowLeft } from "react-icons/fa6";
import { MdOutlineGridView } from "react-icons/md";
import MoneyFormatter from '../utils/MoneyFormatter';
export default function LightBox({ property, photoGroup, activeImageIndex, setActiveImageIndex, onClose, onPrevious, onNext }) {

    const [galleryVisible, setGalleryVisible] = useState(true);


    return (
        <div className='fixed inset-0 w-full h-full bg-neutral-light z-[1000] overflow-y-scroll lg:overflow-y-hidden'>
            <div className='sticky top-0 flex bg-white h-[4.375rem] justify-between items-center px-4'>
                <div className='max-w-7xl mx-auto w-full px-4 py-5 flex'>
                    <div className='flex-1 flex gap-x-4'> 
                        <button onClick={onClose} className='flex gap-x-2 items-center text-complement-deep font-medium'><FaArrowLeft className='text-gray-800 text-base'/> Back</button>
                        <div className='hidden md:flex flex-col'>
                            <p className='text-sm font-medium text-accent-dark'>
                                {property.property.address.house_name_number !== "" && property.property.address.house_name_number != "undefined" && property.property.address.house_name_number != "N/A" && property.property.address.house_name_number != "Not specified"  
                                    ? property.property.address.house_name_number + ', ' 
                                    : "" 
                                }
                                {property.property.address.street_name !== "" ? property.property.address.street_name + ', ' : "" }
                                {property.property.address.postcode_1 !== "" ? property.property.address.postcode_1 + ' ' : "" }
                                {property.property.address.postcode_2 !== "" ? property.property.address.postcode_2 + ' ' : "" }
                            </p>
                            <p className='text-xs text-gray-800'>{<MoneyFormatter amount={property.property.price.amount}/>}</p>
                        </div>
                    </div>
                    <div className='w-10' aria-hidden="true"></div>
                </div>               
            </div>
            <div className='max-w-3xl mx-auto px-4 lg:hidden shadow-md'>
                <ul className='flex flex-col gap-y-5'>
                    {photoGroup.map((photo, index) => (
                        <li key={index}>
                            <img src={photo.url} alt="" />
                            <div className=''>
                                <p className='text-accent-dark text-sm font-medium pt-2'><strong>{`${index + 1} of ${photoGroup.length}`}</strong></p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='hidden lg:flex h-[calc(100%-4.375rem)]'>
                {galleryVisible && (
                    <div className='w-[20.313rem] h-full'>
                        <div className='h-[2.5rem] flex items-center justify-between px-4'>
                            <p className='text-sm flex gap-x-2'><MdOutlineGridView /> Gallery</p>
                            <button onClick={() => setGalleryVisible(false)} className='text-xs text-complement-deep font-semibold'>Hide</button>
                        </div>
                        <ul className='grid grid-cols-2 gap-3 h-[calc(100%-40px)] overflow-y-scroll px-4 py-5'>
                            {photoGroup.map((photo, index) => (
                                <li key={index}>
                                    <img 
                                        src={photo.url} 
                                        alt="" 
                                        className={`rounded-lg aspect-[4/3] object-cover ${activeImageIndex === index ? 'ring-2 ring-complement-medium' : ''}`}
                                        onClick={() => setActiveImageIndex(index)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>                    
                )}
                <div className={`${galleryVisible ? 'w-[calc(100vw-20.313rem)]' : 'w-full'} p-[9.375rem] relative`}>
                    <button 
                        className={`${galleryVisible ? 'hidden' : 'flex'} items-center justify-center absolute top-[10px] left-[10px] p-4 rounded-lg border border-solid border-complement-medium`}
                        onClick={() => setGalleryVisible(true)}
                    >
                        <MdOutlineGridView className='text-lg' />
                    </button>
                    <div className='transform -translate-y-1/2 top-1/2 relative'>
                        <button className="absolute left-[-4.688rem] transform -translate-y-1/2 top-1/2 group" onClick={onPrevious}><FaCircleChevronLeft className='text-complement-medium text-5xl group-hover:text-complement-deep transition-colors duration-200 ease-linear' /></button>
                        {photoGroup.length !== 0 && (
                            <div>
                                <img className="mx-auto max-h-[37.5rem]" src={photoGroup[activeImageIndex].url} alt=""/>
                                <p className='text-center text-sm font-medium text-accent-dark mt-2'>{activeImageIndex + 1} of {photoGroup.length}</p>
                            </div>
                            
                        )}
                        <button className="absolute right-[-4.688rem] transform -translate-y-1/2 top-1/2 group" onClick={onNext}><FaCircleChevronRight className='text-complement-medium text-5xl group-hover:text-complement-deep transition-colors duration-200 ease-linear'/></button>                        
                    </div>

                </div>
            </div>
        </div>
    )
}
LightBox.propTypes = {
    property: PropTypes.shape({
        property: PropTypes.shape({
            address: PropTypes.shape({
                county: PropTypes.string,
                district: PropTypes.string,
                house_name_number: PropTypes.string,
                postcode_1: PropTypes.string,
                postcode_2: PropTypes.string,
                street_name: PropTypes.string,
                town: PropTypes.string
            }),
            details: PropTypes.shape({
                media: PropTypes.arrayOf(
                    PropTypes.shape({
                        url: PropTypes.string.isRequired,
                    })
                ).isRequired
            }).isRequired,
            price: PropTypes.shape({
                amount: PropTypes.number.isRequired
            }),
        }).isRequired
    }).isRequired,
    photoGroup: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
    activeImageIndex: PropTypes.number.isRequired,
    setActiveImageIndex: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
};
