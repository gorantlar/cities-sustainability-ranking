import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./SearchBar.css";
import { getCity, openSidebar } from '../actions/index';
import {
    Marker,
    Map,
    useMap
} from 'react-map-gl';

// export default function SearchBar({ top500Cities, placeholder }) {
export default function SearchBar({ cities, placeholder }) {
    let dispatch = useDispatch();
    const { current: map } = useMap();

    // const { cities } = useSelector((state) => state.cityData);
    console.log('map', map);


    const newCitySelected = (target, city) => {
        const citySelected = city;
        
        if (city != undefined) {
            console.log('citySelected', citySelected);
            dispatch(getCity(citySelected));
            map.flyTo({ center: [citySelected.longitude, citySelected.latitude], zoom: 8.5, offset: [-150, -50] });
            dispatch(openSidebar());
        }
    }

    return (
        <div className="search">
            <div className="searchInput">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={cities}
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => option.name + ", " + option.state_id}
                    onChange={(e, value) => newCitySelected(e.target, value)}
                    renderInput={
                        (params) =>
                            <TextField {...params} placeholder={placeholder} autoFocus={true} />
                    }
                />
            </div>
        </div>
    );

}