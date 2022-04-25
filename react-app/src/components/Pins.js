import React, { useState } from 'react';
import Pin from './Pin.tsx';
import Pin2 from './Pin2';
import {
    Marker,
    Map,
    useMap
} from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux';
import { getCity, openSidebar } from '../actions/index';

const Pins = ({ cities, setPopupInfo }) => {
    let dispatch = useDispatch();
    // console.log(cities);

    const { current: map } = useMap();
    const [sidebar, setSidebar] = useState(false);

    console.log('map2', map);

    const markerClicked = (city) => {
        dispatch(getCity(city));
        map.flyTo({ center: [city.longitude, city.latitude], zoom: 8.5, offset: [-150, -50] });
        dispatch(openSidebar());
    }

    return cities.map((city, index) => (
        <Marker
            key={`marker-${index}`}
            longitude={city.longitude}
            latitude={city.latitude}
            anchor="bottom"
        >
            <Pin2 city={city} onClick={() => markerClicked(city)} />
        </Marker>
    ));
};

export default Pins;