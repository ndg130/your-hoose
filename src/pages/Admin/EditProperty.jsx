import { useContext, useRef, useState, useEffect} from 'react'
import { PropertiesContext } from '../../context/properties';
import { useParams, useNavigate, Link } from 'react-router-dom';

import Sidebar from '../../components/Admin/Sidebar';


export default function EditProperty() {
    const navigate = useNavigate(); 
    const { id } = useParams();
    const { properties, fetchProperties, setProperties, loading, error } = useContext(PropertiesContext);
    const [property, setProperty] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        address: {
            county: "",
            district: "",
            house_name_number: "",
            postcode_1: "",
            postcode_2: "",
            street_name: "",
            town: ""
        },
        agent_ref: "",
        details: {
            bathrooms: "",
            bedrooms: "",
            description: "",
            features: [],
            currentFeature: "",
            media: [],
            imageUrl: "",
            maxNumber: "",
            property_type: "",
            reception_rooms: "",
            status: ""
        },
        listing_date: "",
        price: {
            amount: "",
            frequency: "",
            qualifier: ""
        },
        update_date: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          details: {
            ...prev.details,
            [name]: value, // Dynamically set the field based on the name
          },
        }));
      };
    
      const handleAddFeature = () => {
        if (formData.details.currentFeature.trim()) {
          setFormData((prev) => ({
            ...prev,
            details: {
              ...prev.details,
              features: [...prev.details.features, formData.details.currentFeature],
              currentFeature: "", // Reset the input field after adding
            },
          }));
        }
      };




      const handleDeleteFeature = (index) => {
        setFormData((prev) => ({
          ...prev,
          details: {
            ...prev.details,
            features: prev.details.features.filter((_, i) => i !== index), // Remove the feature at the given index
          },
        }));
      };

      const handleAddImages = () => {
        const { imageUrl, maxNumber } = formData.details;
        const max = parseInt(maxNumber, 10);
    
        if (!imageUrl.trim() || isNaN(max) || max <= 0) return;
    
        let media = [];
        for (let i = 0; i < max; i++) {
          let current = i < 10 ? `0${i}` : i;
          const [partOne, partTwoAndThree] = imageUrl.split("IMG_");
    
          if (!partTwoAndThree) {
            alert("Invalid image URL format. Ensure 'IMG_' is in the URL.");
            return;
          }
    
          const [partTwo, partThree] = partTwoAndThree.split("_");
          const updatedUrl = `${partOne}IMG_${current}_${partThree}`;
    
          media.push({ type: "image", url: updatedUrl });
        }
    
        setFormData((prev) => ({
          ...prev,
          details: {
            ...prev.details,
            images: [...prev.details.media, ...media], // Add new images to existing ones
            imageUrl: "", // Clear input fields
            maxNumber: "",
          },
        }));
      };

      const handleDeleteImage = (index) => {
        setFormData((prev) => ({
          ...prev,
          details: {
            ...prev.details,
            images: prev.details.media.filter((_, i) => i !== index),
          },
        }));
      };
 

    useEffect(() => {
        if (properties && properties.length > 0) {
            const findProperty = properties.find(p => Number(p.property.id) === Number(id));
            if (findProperty) {
                setFormData({
                    id: findProperty.property.id,
                    address: { ...findProperty.property.address },
                    agent_ref: findProperty.property.agent_ref,
                    details: {
                        ...findProperty.property.details,
                        features: [...findProperty.property.details.features],
                        media: [...findProperty.property.details.media]
                    },
                    listing_date: findProperty.property.listing_date,
                    price: { ...findProperty.property.price },
                    update_date: findProperty.property.update_date
                });
            }
        }
    }, [id, properties]);
    
    useEffect(() => {
        if (!properties || properties.length === 0) {
            fetchProperties();
        }
    }, []);
    

    return (
        <div className='relative flex flex-col lg:flex-row h-full min-h-[calc(100vh-64px)] lg:min-h-screen'>
            <Sidebar activePage="products"/>
            <div className='flex-1 lg:ml-72 max-w-2xl sm:max-w-5xl lg:max-w-7xl w-full h-full py-10 px-4'>
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-3xl font-semibold text-theme-900">Edit property{id ? ' #'+id : '' }</h1>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex gap-x-3 items-center">
                            <Link to={`/dashboard/products`} type="button" className="block rounded-md bg-theme-100 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-theme-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Cancel</Link>
                            <button
                                className="px-4 py-2 rounded-lg cursor-pointer bg-red-500 text-white hover:bg-red-500/90"
                                
                            >
                                Delete Product
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
                    <form id="propertyForm" className="max-w-3xl mx-auto p-4 border rounded bg-white">
                        {/* Property Address */}
                        <fieldset className="mb-6 p-4 border rounded">
                            <legend className="text-lg font-semibold mb-4">Estate Agent</legend>
 
                            {/* Agent reference */}
                            <div className="mb-4">
                                <label htmlFor="furnished" className="block font-medium mb-1">Agent Reference</label>
                                <select
                                    id="furnished"
                                    name="furnished"
                                    value={formData.agent_ref}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded bg-white"
                                >
                                    <option value="">Select</option>
                                    <option value="furnished">Furnished</option>
                                    <option value="unfurnished">Unfurnished</option>
                                    <option value="part-furnished">Part-Furnished</option>
                                </select>
                            </div>                           
                        </fieldset>
                        {/* Property Address */}
                        <fieldset className="mb-6 p-4 border rounded">
                            <legend className="text-lg font-semibold mb-4">Property Address</legend>

                            {/* House Name or Number */}
                            <div className="mb-4">
                            <label htmlFor="house_name_number" className="block font-medium mb-1">
                                House Name or Number
                            </label>
                            <input
                                type="text"
                                id="house_name_number"
                                name="house_name_number"
                                value={formData.address.house_name_number}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded bg-white"
                            />
                            </div>

                            {/* Street Name */}
                            <div className="mb-4">
                            <label htmlFor="street_name" className="block font-medium mb-1">
                                Street Name
                            </label>
                            <input
                                type="text"
                                id="street_name"
                                name="street_name"
                                value={formData.address.street_name}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded bg-white"
                            />
                            </div>

                            {/* Town */}
                            <div className="mb-4">
                            <label htmlFor="town" className="block font-medium mb-1">Town</label>
                            <input
                                type="text"
                                id="town"
                                name="town"
                                value={formData.address.town}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded bg-white"
                            />
                            </div>

                            {/* District */}
                            <div className="mb-4">
                            <label htmlFor="district" className="block font-medium mb-1">District</label>
                            <input
                                type="text"
                                id="district"
                                name="district"
                                value={formData.address.district}
                                onChange={handleChange}
                                className="w-full p-2 border rounded bg-white"
                            />
                            </div>

                            {/* County */}
                            <div className="mb-4">
                            <label htmlFor="county" className="block font-medium mb-1">County</label>
                            <input
                                type="text"
                                id="county"
                                name="county"
                                value={formData.address.county}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded bg-white"
                            />
                            </div>

                            {/* Postcode */}
                            <div className="mb-4">
                            <label htmlFor="postcode" className="block font-medium mb-1">Postcode</label>
                            <div className="flex gap-2">
                                <input
                                type="text"
                                id="postcode_1"
                                name="postcode_1"
                                value={formData.address.postcode_1}
                                onChange={handleChange}
                                required
                                className="w-1/2 p-2 border rounded bg-white"
                                />
                                <input
                                type="text"
                                id="postcode_2"
                                name="postcode_2"
                                value={formData.address.postcode_2}
                                onChange={handleChange}
                                className="w-1/2 p-2 border rounded bg-white"
                                />
                            </div>
                            </div>


                        </fieldset>

                        {/* Property Details */}
                        <fieldset className="mb-6 p-4 border rounded">
                            <legend className="text-lg font-semibold mb-4">Property Details</legend>

                            {/* Property Type */}
                            <div className="mb-4">
                                <label htmlFor="property_type" className="block font-medium mb-1">Property Type</label>
                                <input
                                    type="text"
                                    id="property_type"
                                    name="property_type"
                                    value={formData.details.property_type}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded bg-white"
                                />
                            </div>

                            {/* Bedrooms */}
                            <div className="mb-4">
                                <label htmlFor="bedrooms" className="block font-medium mb-1">Bedrooms</label>
                                <input
                                    type="number"
                                    id="bedrooms"
                                    name="bedrooms"
                                    value={formData.details.bedrooms}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded bg-white"
                                />
                            </div>

                            {/* Bathrooms */}
                            <div className="mb-4">
                                <label htmlFor="bathrooms" className="block font-medium mb-1">Bathrooms</label>
                                <input
                                    type="number"
                                    id="bathrooms"
                                    name="bathrooms"
                                    value={formData.details.bathrooms}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded bg-white"
                                />
                            </div>

                            {/* Reception Rooms */}
                            <div className="mb-4">
                                <label htmlFor="reception_rooms" className="block font-medium mb-1">Reception Rooms</label>
                                <input
                                    type="number"
                                    id="reception_rooms"
                                    name="reception_rooms"
                                    value={formData.details.reception_rooms}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded bg-white"
                                />
                            </div>

                            {/* Property Description */}
                            <div className="mb-4">
                                <label htmlFor="description" className="block font-medium mb-1">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="10"
                                    value={formData.details.description}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded bg-white"
                                />
                            </div>

                            {/* Property Features */}
                            <div className="mb-4">
                                <label htmlFor="features" className="block font-medium mb-1">Property Feature</label>
                                <input
                                type="text"
                                id="features"
                                name="currentFeature" // Make sure it binds to the correct state field
                                value={formData.details.currentFeature}
                                onChange={handleChange}
                                className="w-full p-2 border rounded bg-white"
                                />
                                <button
                                type="button"
                                onClick={handleAddFeature}
                                className="mt-2 p-2 bg-blue-500 text-white rounded"
                                >
                                Add Feature
                                </button>
                                <div className='mt-5 w-full'>
                                <ul className='flex flex-col gap-y-2 list-disc list-inside w-full'>
                                    {formData.details.features.map((feature, index) => (
                                    <li key={index} className='flex justify-between w-full'>{feature} <button onClick={() => handleDeleteFeature(index)}>x</button></li> // Ensure there's a return here
                                    ))}
                                </ul>
                                </div>
                            </div>

                        </fieldset>

                        {/* Price Section */}
                        <fieldset className="mb-6 p-4 border rounded">
                            <legend className="text-lg font-semibold mb-4">Price Details</legend>

                            <label className="block mb-2">Price Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.price.amount}
                                onChange={handleChange}
                                className="w-full p-2 border rounded mb-4"
                            />

                            <label className="block mb-2">Price Frequency</label>
                            <select
                                name="frequency"
                                value={formData.price.frequency}
                                onChange={handleChange}
                                className="w-full p-2 border rounded mb-4"
                            >
                                <option value="sale">Sale</option>
                                <option value="let">To Let</option>
                            </select>


                            <label className="block mb-2">Qualifier</label>
                            <select
                                name="qualifier"
                                value={formData.price.qualifier}
                                onChange={handleChange}
                                className="w-full p-2 border rounded mb-4"
                            >
                                <option value="offers-over">Offers over</option>
                                <option value="oiro">OIRO</option>
                            </select>
                        </fieldset>

      {/* Images Section */}
      <fieldset className="mb-6 p-4 border rounded">
        <legend className="text-lg font-semibold mb-4">Images</legend>

        <input
          type="text"
          name="imageUrl"
          value={formData.details.imageUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          placeholder="Enter image URL"
        />

        <input
          type="text"
          name="maxNumber"
          value={formData.details.maxNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          placeholder="Enter number of images available"
        />

        <button
          type="button"
          onClick={handleAddImages}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Generate Images
        </button>
      </fieldset>

      {/* Display Image URLs */}
      <div>
        <ul className="mt-4 grid grid-cols-6 gap-2">
          {formData.details.media.map((image, index) => (
            <li key={index} className="flex justify-between items-center mb-2 relative">
              <img src={image.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline"
                
              />
              <button
                onClick={() => handleDeleteImage(index)}
                className="bg-complement-deep rounded-sm h-5 w-5 flex items-center justify-center text-white absolute right-1 top-1"
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                            >
                                Submit Property
                            </button>
                        </div>
                    </form>
                    </div>
            </div>
            <div className={`relative z-[9999] ${showDeleteModal ? 'block' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500/75 transition-opacity pointer-events-none" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    
                    <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                        <button type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span className="sr-only">Close</span>
                            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                        </div>
                        <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                            <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            </svg>
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3 className="text-base font-semibold text-gray-900" id="modal-title">Delete product</h3>
                            <div className="mt-2">
                            <p className="text-sm text-gray-500">Are you sure you want to delete this product? All of the data will be permanently removed from the products database forever. This action cannot be undone.</p>
                            </div>
                        </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button type="button" /* onClick={handleDelete} */ className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
                            <button type="button" onClick={() => {setShowDeleteModal(false)}} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}
