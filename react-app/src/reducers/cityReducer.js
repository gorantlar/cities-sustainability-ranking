import * as types from '../actions/types';

const initialState = {
    cities: [],
    totalCount: 0,
    citySelected: { name: "sanju" },
    loading: true
};

// const citySlice = createSlice({
//     name: "cityInfo",
//     initialState,
//     reducers: {

//     }
// })

const cityReducers = (state = initialState, action) => {

    switch (action.type) {
        case types.GOT_CITIES:
            return {
                ...state,
                cities: action.payload.cities,
                totalCount: action.payload.total_count,
                loading: false
            };
        case types.GOT_CITY_DETAILS:
            console.log("GOT_CITY_DETAILS");
            return {
                ...state,
                citySelected: { ...action.payload },
                loading: false
            }
        default: return state;
    }

};

export default cityReducers;