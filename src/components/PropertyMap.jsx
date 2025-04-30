import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import  L  from 'leaflet';
import "leaflet/dist/leaflet.css";
import pinIcon from '../assets/images/marker-icon.png';

export default function PropertyMap({latitude, longitude}) {
    const mapRef = useRef(null);
    const customIcon = new L.Icon({
        iconUrl: pinIcon,
        iconSize: [20, 30], // width, height in pixels
        iconAnchor: [16, 32], // point of the icon which corresponds to marker's location
        popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
      });
    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={17}
            ref={mapRef}
            style={{ height: "50vh", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]} icon={customIcon}>
                <Popup>
                    A property is located here.
                </Popup>
            </Marker>
        </MapContainer>
    );
}