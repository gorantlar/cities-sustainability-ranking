import * as types from '../actions/types';

const initalState = {
    cities: [],
    totalCount: 0,
    citySelected: undefined,
    loading: true
};

const cityReducers = (state = initalState, action) => {

    switch(action.type) {
        case types.GOT_CITIES:
            return {
                ...state,
                cities: action.payload.cities,
                totalCount: action.payload.total_count,
                loading: false
            };
        default: return state;
    }

};

export default cityReducers;