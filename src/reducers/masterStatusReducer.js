/* eslint-disable import/no-anonymous-default-export */
import {
    GET_MASTER_STATUS,
    GET_MASTER_STATUS_SUCCESS,
    GET_MASTER_STATUS_ERROR,

    ADD_MASTER_STATUS,
    ADD_MASTER_STATUS_SUCCESS,
    ADD_MASTER_STATUS_ERROR,

    GET_MASTER_STATUS_BY_ID,
    GET_MASTER_STATUS_BY_ID_SUCCESS,
    GET_MASTER_STATUS_BY_ID_ERROR,

    SET_ACTUAL_MASTER_STATUS,

    EDIT_MASTER_STATUS,
    EDIT_MASTER_STATUS_SUCCESS,
    EDIT_MASTER_STATUS_ERROR,

    DELETE_MASTER_STATUS,
    DELETE_MASTER_STATUS_SUCCESS,
    DELETE_MASTER_STATUS_ERROR,
    LOADING

} from '../types';

// cada reducer tiene su propio state

const initialState = {
    masterStatusList:[],
    masterStatus: null,
    error: null,
    loading: false,
};

export default function(state= initialState, action){
    switch(action.type){

            case GET_MASTER_STATUS:
            case ADD_MASTER_STATUS:
            case GET_MASTER_STATUS_BY_ID:
            case EDIT_MASTER_STATUS:
            case DELETE_MASTER_STATUS:
            return {
                ...state,
                loading:true
            };

            case ADD_MASTER_STATUS_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    masterStatusList : [...state.masterStatusList, action.payload]
                };


            case GET_MASTER_STATUS_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    masterStatusList :  action.payload
                };


            case SET_ACTUAL_MASTER_STATUS:
            return{
                ...state,
                masterStatus: action.payload
            };

            case EDIT_MASTER_STATUS_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    masterStatus: null,
                    masterStatusList : state.masterStatusList.map(masterStatus =>
                        masterStatus.id === action.payload.id ? masterStatus = action.payload :
                        masterStatus
                    )
                };

            case EDIT_MASTER_STATUS_ERROR:
                return {
                    ...state,
                    loading: false,
                    masterStatus:null,
                    error: action.payload
                };


            case DELETE_MASTER_STATUS_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    masterStatusList: state.masterStatusList.filter(status => status.id !== action.payload),
                    masterStatus:null
                };
            case DELETE_MASTER_STATUS_ERROR:
                return {
                    ...state,
                    loading: false,
                    masterStatus:null,
                    error: action.payload
                };
            case LOADING:
            return{
                ...state,
                loading:true
            };

            case GET_MASTER_STATUS_ERROR:
            case GET_MASTER_STATUS_BY_ID_ERROR:
            case ADD_MASTER_STATUS_ERROR:
            return {
                ...state,
                loading:false,
                error: action.payload
            };

        default:
            return state;
    }
}