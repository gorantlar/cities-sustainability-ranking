import React, { useState } from 'react';
import Pin2 from './Pin';
import {
    Marker,
    useMap
} from 'react-map-gl';
import { useDispatch } from 'react-redux';
import { getCity, openSidebar } from '../actions/index';

const Pins = ({ cities, setPopupInfo }) => {
    let dispatch = useDispatch();

    const { current: map } = useMap();

    const markerClicked = (city) => {
        console.log('city', city);
        dispatch(getCity(city));
        map.flyTo({ center: [city.longitude, city.latitude], zoom: 8, offset: [-250, -50] });
        dispatch(openSidebar());
        setPopupInfo(city);
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