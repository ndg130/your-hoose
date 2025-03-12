import { Link } from 'react-router-dom';
import { useContext, useRef} from 'react'
import { PropertiesContext } from '../../context/properties';
import AdminPropertyCard from '../../components/Admin/AdminPropertyCard';

export default function PropertiesDashboard() {

    const { id } = useRef();

    const { properties, loading: propertiesLoading, error: propertiesError } = useContext(PropertiesContext);
    console.log(properties)
    return (
        <div>
            <div className='max-w-7xl mx-auto px-6 py-10'>
                <h1 className='text-accent-dark'>Properties</h1>
                <div className='flex flex-col gap-5 mt-10'>
                    {propertiesLoading ? (
                        <p>Loading properties...</p>
                    ) : properties.length > 0 ? (
                        properties.map((property, index) => (
                            <AdminPropertyCard key={index} property={property}/>
                        ))
                    ) : (
                        <p>No properties</p>
                    )}
                </div>
            </div>
        </div>
    )
}
