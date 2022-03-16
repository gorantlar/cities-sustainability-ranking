import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./SearchBar.css";

export default function SearchBar({ top500Cities, placeholder }) {

    console.log(top500Cities);

    return (
        <div className="search">
            <div className="searchInput">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top500Cities}
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => option.City_Name+", "+option.State_ID}
                    renderInput={
                        (params) =>
                            <TextField {...params} placeholder={placeholder} autoFocus={true} />
                    }
                />
            </div>
        </div>
    );

}