import { combineReducers } from "redux";
import cityReducers from './cityReducer';

export default combineReducers({
    cityData: cityReducers
});