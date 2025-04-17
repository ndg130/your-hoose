import { useContext, useState } from 'react';
import { PropertiesContext } from '../../context/properties';
import { EstateAgentsContext } from '../../context/estateAgents';
import DashboardLinkCard from '../../components/Admin/DashboardLinkCard';
import Sidebar from '../../components/Admin/Sidebar';
import Button from '../../components/Button';

export default function Dashboard() {

    const { properties, loading: propertiesLoading, error: propertiesError } = useContext(PropertiesContext);
    const { estateAgents, loading: estateAgentsLoading, error: estateAgentsError } = useContext(EstateAgentsContext)

    const [propertyFormVisible, setPropertyFormVisible] = useState(true);
    const [propertyJSON, setPropertyJSON] = useState({});
    const [listingId, setListingId] = useState('');
    console.log(estateAgents)

    const handleResetForm = () => {
        setPropertyFormVisible(true);
    
        // Wait for the form to re-render before trying to access the DOM elements
        setTimeout(() => {
            document.getElementById('listingJson').value = "";
            document.getElementById('listingImageURL').value = "";
            document.getElementById('listingImageCount').value = "";
            setPropertyJSON(""); // Clear the output as well if needed
        }, 0);
    }
    const copyValue = () => {
        const output = document.getElementById('propertyOutput');
        if (output) {
            navigator.clipboard.writeText(output.value)
        }
    }

    /**
     *  Generate a property JSON object with content scraped from rightmove using chatgpt
    */
    const generateProperty = () => {
        console.log('generating property');

        // get input values
        const json = document.getElementById('listingJson').value;
        const imageUrl = document.getElementById('listingImageURL').value;
        const imageCount = parseInt(document.getElementById('listingImageCount').value, 10);
        const agentRef = document.getElementById('agentSelector').value;
        const listingId = document.getElementById('listingId').value;

        let media = [];

        // generate image array
        for (let i = 0; i < imageCount; i++) {
            const current = String(i).padStart(2, '0');
          
            // Validate the image URL structure
            const [partOne, partTwoAndThree] = imageUrl.split('IMG_');
            if (!partTwoAndThree) continue;
          
            const [partTwo, partThree] = partTwoAndThree.split('_');
            if (!partThree) continue;
          
            const updatedUrl = `${partOne}IMG_${current}_${partThree}`;
          
            media.push({
              type: 'image',
              url: updatedUrl,
            });
        }
        
        
        try {
            let jsonObject = JSON.parse(json);
            jsonObject.property.details.media = media;
            jsonObject.property.agent_ref = agentRef;
            jsonObject.property.id = listingId;
        
            setPropertyJSON(JSON.stringify(jsonObject, null, 2));
            setPropertyFormVisible(false);
        } catch (err) {
            alert('Invalid JSON input. Please check and try again.');
            console.error(err);
        }
        
    }

    return (
        <div>
            <Sidebar />
            <div className='flex-1 lg:ml-72 max-w-2xl sm:max-w-5xl lg:max-w-7xl w-full h-full py-10 px-4'>
                <h1 className='text-accent-dark'>Dashboard</h1>
                <div className='grid grid-cols-3 gap-5 mt-10'>
                    <DashboardLinkCard data={properties} dataType="properties" loading={propertiesLoading} to="/admin/properties"/>
                    <DashboardLinkCard data={estateAgents} dataType="estate agents" loading={estateAgentsLoading} to="/admin/estate-agents" />
                </div>
                <div className='mt-20'>
                    <h2 className='pb-4'>Listing Generator</h2>
                    {propertyFormVisible && (
                        <div>
                            <p className='pb-2'>Add the listing json taken from ChatGPT here:</p>
                            <textarea name="listingJson" id="listingJson" rows={20} className='mb-3 p-3 w-full max-w-2xl border-accent-dark border-2 rounded-lg'></textarea>
                            <p className='pb-2'>Add the image url from the rightmove listing here:</p>
                            <input id="listingImageURL" type='text' className='mb-3 p-3 w-full max-w-2xl border-accent-dark border-2 rounded-lg'></input>
                            <p className='pb-2'>Add the number of available images here:</p>
                            <input id="listingImageCount" type='text' className='mb-3 p-3 w-full max-w-2xl border-accent-dark border-2 rounded-lg'></input>
                            <p className='pb-2'>Add an ID for the listing (numeric):</p>
                            <input
                            id="listingId"
                            type="text"
                            value={listingId}
                            onChange={(e) => setListingId(e.target.value)}
                            className='mb-3 p-3 w-full max-w-2xl border-accent-dark border-2 rounded-lg'
                            />
                            <p className='pb-2'>Select the estate agent for the listing:</p>
                            <select id="agentSelector" className='block bg-white w-full max-w-2xl p-3 border-2 border-accent-dark rounded-lg'>
                            {estateAgentsLoading ? (
                            <option>Loading agents...</option>
                            ) : estateAgents?.length ? (
                            estateAgents.map((item, index) => {
                                const agent = item.agent;
                                return (
                                    <option key={index} value={agent.name}>{agent.name}</option>
                                );
                            })
                            ) : (
                            <option>No estate agents found.</option>
                            )}
                            </select>
                            <div className='py-10'>
                                <Button style="primary" text="Generate" onClick={generateProperty}/>   
                            </div>                        
                        </div>                        
                    )}
                    {!propertyFormVisible && (
                    <div>
                        <textarea value={propertyJSON} id="propertyOutput" rows={20} className='mb-3 p-3 w-full max-w-2xl border-accent-dark border-2 rounded-lg'></textarea>
                        <div className='pt-10 flex gap-x-5'>
                            <Button style="primary" text="Copy" onClick={copyValue}/>   
                            <Button style="danger" text="Reset" onClick={handleResetForm}/>   
                        </div>  
                    </div>
                    )}

                </div>
            </div>
        </div>
    )
}
