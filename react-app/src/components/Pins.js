import React from 'react';
import Pin from './Pin.tsx';
import Pin2 from './Pin2';
import {
    Marker,
    Map,
    useMap
} from 'react-map-gl';

const Pins = ({ cities, setPopupInfo }) => {
    // console.log(cities);
    const {current: map} = useMap();

    return cities.map((city, index) => (
        <Marker
            key={`marker-${index}`}
            longitude={city.longitude}
            latitude={city.latitude}
            anchor="bottom"
        >
            <Pin2 city={city} onClick={() => map.flyTo({center: [city.longitude, city.latitude], zoom: 12.5, offset: [-300, 0]})} />
        </Marker>
    ));
};

export default Pins;