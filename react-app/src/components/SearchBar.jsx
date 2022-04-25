import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./SearchBar.css";
import { getCity } from '../actions/index';

// export default function SearchBar({ top500Cities, placeholder }) {
export default function SearchBar({ cities, placeholder }) {
    let dispatch = useDispatch();

    const newCitySelected = (target, city) => {
        if(city != undefined){
            dispatch(getCity(city));
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