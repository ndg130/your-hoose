import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import PropTypes from 'prop-types';
import geoJson from '../chicago-parks.json';
mapboxgl.accessToken = "pk.eyJ1IjoiZ2VvcmRpZWRpZ2l0YWwiLCJhIjoiY203dzRsZmt2MDFrMTJqc2VuczFwZDhvbSJ9.WIcMu9vKyzQKaLN6ShhalQ";

const PropertyMap = () => {
    const mapContainerRef = useRef(null);
  

    const [lng, setLng] = useState(-87.65);
    const [lat, setLat] = useState(41.84);
    const [zoom, setZoom] = useState(10);


    useEffect(() => {
      // Ensure the map is initialized only once
     
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [lng, lat],
          zoom: zoom,
        });
        
        geoJson.features.map((feature) => 
            new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map)
        );

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        })

       return () => map.remove()

    }, []);
  
    return <div className="map-container" ref={mapContainerRef} />;
  };
  
  export default PropertyMap;

PropertyMap.propTypes = {
    longitude: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired
}
