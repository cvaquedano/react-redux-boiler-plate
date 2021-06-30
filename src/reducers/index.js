import {combineReducers} from 'redux';
import alertReducer from './alertReducer';
import authReducer from  './authReducer';
import masterStatusReducer from  './masterStatusReducer';

export default combineReducers({
    alerts : alertReducer,
    auth: authReducer,
    masterStatus: masterStatusReducer

})