import * as types from "./types";
import axios from "axios";

export const getCities = (page, limit, filter) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/index/${page}/${limit}`, filter)
            .then((response) => {
                console.log('response', response);
                dispatch({
                    type: types.GOT_CITIES,
                    payload: response.data
                })
            })
    }
};

export const getCity = (city) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/citydetails/${city.city_id}`)
        .then((response) => {
            console.log('response', response);
            dispatch({
                type: types.GOT_CITY_DETAILS,
                payload: response.data
            })
        })
    }
};

export const closeSidebar = () => {
    return function(dispatch) {
        dispatch({
            type: types.CLOSE_SIDEBAR,
        })
    }
}

export const openSidebar = () => {
    return function(dispatch) {
        dispatch({
            type: types.OPEN_SIDEBAR,
        })
    }
}