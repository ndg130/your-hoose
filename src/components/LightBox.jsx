import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { MdOutlineGridView } from "react-icons/md";
export default function LightBox({ property, photoGroup, activeImageIndex, setActiveImageIndex, onClose, onPrevious, onNext }) {

    const [galleryVisible, setGalleryVisible] = useState(true);


    return (
        <div className='fixed inset-0 w-full h-full bg-neutral-light z-[1000] overflow-y-scroll lg:overflow-y-hidden'>
            <div className='sticky top-0 flex bg-white h-[70px]'>
                <div className='max-w-7xl mx-auto px-4 py-5'>
                    <button onClick={onClose}>Back</button>
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
            <div className='hidden lg:flex h-[calc(100%-70px)]'>
                {galleryVisible && (
                    <div className='w-[325px] h-full'>
                        <div className='h-[40px] flex items-center justify-between px-4'>
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
                <div className={`${galleryVisible ? 'w-[calc(100vw-325px)]' : 'w-full'} p-[150px] relative`}>
                    <button 
                        className={`${galleryVisible ? 'hidden' : 'flex'} items-center justify-center absolute top-[10px] left-[10px] p-4 rounded-lg border border-solid border-complement-medium`}
                        onClick={() => setGalleryVisible(true)}
                    >
                        <MdOutlineGridView className='text-lg' />
                    </button>
                    <div className='transform -translate-y-1/2 top-1/2 relative'>
                        <button className="absolute left-[-75px] transform -translate-y-1/2 top-1/2 group" onClick={onPrevious}><FaCircleChevronLeft className='text-complement-medium text-5xl group-hover:text-complement-deep transition-colors duration-200 ease-linear' /></button>
                        {photoGroup.length !== 0 && (
                            <div>
                                <img className="mx-auto max-h-[600px]" src={photoGroup[activeImageIndex].url} alt=""/>
                                <p className='text-center text-sm font-medium text-accent-dark mt-2'>{activeImageIndex + 1} of {photoGroup.length}</p>
                            </div>
                            
                        )}
                        <button className="absolute right-[-75px] transform -translate-y-1/2 top-1/2 group" onClick={onNext}><FaCircleChevronRight className='text-complement-medium text-5xl group-hover:text-complement-deep transition-colors duration-200 ease-linear'/></button>                        
                    </div>

                </div>
            </div>
        </div>
    )
}
LightBox.propTypes = {
    property: PropTypes.shape({
        property: PropTypes.shape({
            details: PropTypes.shape({
                media: PropTypes.arrayOf(
                    PropTypes.shape({
                        url: PropTypes.string.isRequired,
                    })
                ).isRequired
            }).isRequired
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
