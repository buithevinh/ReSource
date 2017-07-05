import { combineReducers } from 'redux';
import appData from './dataReducers';

const rootReducer =  combineReducers({
    appData
});

export default rootReducer;