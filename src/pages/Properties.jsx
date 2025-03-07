import React, { useEffect, useState } from 'react'
import SimpleHeader from '../components/SimpleHeader'
import SearchHeader from '../components/SearchHeader'
import PropertyCard from '../components/PropertyCard';

export default function Properties() {


    let number = 0;
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
    }
    
    //console.log(media);

    const [properties, setProperties] = useState([]);

    useEffect(() => {

        const fetchProperties = async () => {
            const endpoint = 'http://localhost:4005/properties';
            try {
                const response = await fetch(endpoint);
                if(!response.ok){
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setProperties(data);
                console.log(data);
            } catch (error) {
                console.error('Failed to fetch properties', error);
            }
        };

        fetchProperties();

    }, [])



    return (
        <div className='pb-10'>
            <SimpleHeader headerText="Latest listings for NE39" style="dark" backgroundImage={'https://www.simpsonandbrown.co.uk/files/content/345_rotator1.jpg'}/>
            <div className='max-w-7xl mx-auto px-6 py-10'>
                {properties.length > 0 ? (
                    <div className='flex flex-col gap-y-5 max-w-3xl items-center justify-center mx-auto'>
                        {properties.map((property, index) => (
                            <PropertyCard key={index} property={property} />
                        ))}
                    </div>
                ) : (
                    <p className='text-center'>No properties available</p> // Fallback UI
                )}
            </div>
        </div>
    )
}
