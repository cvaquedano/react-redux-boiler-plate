import {combineReducers} from 'redux';
import alertReducer from './alertReducer';
import authReducer from  './authReducer';
import masterReducer from './masterReducer';
import masterStatusReducer from  './masterStatusReducer';
import masterDetailReducer from  './masterDetailReducer';

export default combineReducers({
    alerts : alertReducer,
    auth: authReducer,
    masterStatus: masterStatusReducer,
    masterDetail: masterDetailReducer,
    master: masterReducer

})