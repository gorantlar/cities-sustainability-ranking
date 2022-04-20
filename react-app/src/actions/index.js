import * as types from "./types";
import axios from "axios";

export const getCities = (page, limit, filter) => {
    return function(dispatch){
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/index/${page}/${limit}`, filter)
        .then((response) => {
            console.log('response', response);
            dispatch({
                type: types.GOT_CITIES,
                payload: response.data
            })
        })
    }
}