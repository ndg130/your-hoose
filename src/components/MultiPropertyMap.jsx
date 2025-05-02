import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import  L  from 'leaflet';
import "leaflet/dist/leaflet.css";
import pinIcon from '../assets/images/marker-icon.png';
import { List } from "lucide-react";

import PixiOverlay from "react-leaflet-pixi-overlay";

export default function MultiPropertyMap({properties, multiPropertyMapVisible, setMultiPropertyMapVisible}) {
    const customIcon = new L.Icon({
        iconUrl: pinIcon,
        iconSize: [20, 30], // width, height in pixels
        iconAnchor: [16, 32], // point of the icon which corresponds to marker's location
        popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
    });

    const mapRef = useRef();

    useEffect(() => {
        if (!properties || !mapRef.current) return;
      
        const bounds = L.latLngBounds(
          properties.map((item) => [
            item.property.address.latitude,
            item.property.address.longitude,
          ])
        );
      
        mapRef.current.fitBounds(bounds);
      }, [properties]);
    
    return (
        <div className={`${multiPropertyMapVisible ? 'fixed inset-0 h-full w-full z-50' : 'hidden'}`}>
            <div className='absolute transform -translate-x-1/2 left-1/2 top-[20px] z-[9999] w-full flex items-center justify-center'>
                <button className="bg-white text-complement-deep font-medium py-2 px-4 rounded-md flex items-center gap-x-2" onClick={() => setMultiPropertyMapVisible(false)} type="button">
                    List view <List size={20} />
                </button>
            </div>
            <MapContainer
                center={[54.92563373640128, -1.7455680926425805]}
                zoom={13}
                style={{ height: "100vh", width: "100vw" }}
                ref={mapRef}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                 {properties && properties.map((property, index) => (
                    <Marker
                    key={index}
                    position={[property.property.address.latitude, property.property.address.longitude]}
                    icon={customIcon}
                    >
                        <Popup>
                            <Link to={`/properties/${property.property.id}`}>
                            {property.property.address.house_name_number !== "" && property.property.address.house_name_number != "undefined" && property.property.address.house_name_number != "N/A" && property.property.address.house_name_number != "Not specified"  
                                ? property.property.address.house_name_number + ', ' 
                                : "" 
                            }
                            {property.property.address.street_name !== "" ? property.property.address.street_name + ', ' : "" }
                            {property.property.address.postcode_1 !== "" ? property.property.address.postcode_1 + ' ' : "" }
                            {property.property.address.postcode_2 !== "" ? property.property.address.postcode_2 + ' ' : "" }                            
                            </Link>
                        </Popup>
                    </Marker>
                ))} 
{/*                 {propertyMarkers.length > 0 && <PixiOverlay markers={propertyMarkers} />} */}

            </MapContainer>            
        </div>

    );
}