import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function PropertyMap({latitude, longitude}) {
    const mapRef = useRef(null);

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
            <Marker position={[latitude, longitude]}>
                <Popup>
                    A property is located here.
                </Popup>
            </Marker>
        </MapContainer>
    );
}