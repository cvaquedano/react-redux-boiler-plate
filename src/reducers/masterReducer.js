/* eslint-disable import/no-anonymous-default-export */
import {
    GET_MASTER,
    GET_MASTER_SUCCESS,
    GET_MASTER_ERROR,

    ADD_MASTER,
    ADD_MASTER_SUCCESS,
    ADD_MASTER_ERROR,

    SET_ACTUAL_MASTER,

    EDIT_MASTER,
    EDIT_MASTER_SUCCESS,
    EDIT_MASTER_ERROR,

    DELETE_MASTER,
    DELETE_MASTER_SUCCESS,
    DELETE_MASTER_ERROR,
    LOADING,
    FILTER_MASTER

} from '../types';

// cada reducer tiene su propio state

const initialState = {
    masterListFiltered:[],
    masterList:[],
    master: null,
    error: null,
    loading: false,
};

export default function(state= initialState, action){
    switch(action.type){

            case GET_MASTER:
            case ADD_MASTER:
            case EDIT_MASTER:
            case DELETE_MASTER:
            return {
                ...state,
                loading:true
            };

            case ADD_MASTER_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    masterList : [...state.masterList, action.payload],
                    masterListFiltered : [...state.masterList, action.payload]
                };


            case GET_MASTER_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    masterList :  action.payload,
                    masterListFiltered : action.payload
                };


            case SET_ACTUAL_MASTER:
            return{
                ...state,
                master: action.payload
            };

            case EDIT_MASTER_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    master: null,
                    masterList : state.masterList.map(master =>
                        master.id === action.payload.id ? master = action.payload :
                        master
                    ),
                    masterListFiltered : state.masterList.map(master =>
                        master.id === action.payload.id ? master = action.payload :
                        master
                    )
                };

            case EDIT_MASTER_ERROR:
                return {
                    ...state,
                    loading: false,
                    master:null,
                    error: action.payload
                };


            case DELETE_MASTER_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    masterList: state.masterList.filter( master=> master.id !== action.payload),
                    masterListFiltered: state.masterList.filter( master=> master.id !== action.payload),
                    master:null
                };
            case FILTER_MASTER:
                return {
                    ...state,
                    masterListFiltered: action.payload.trim()===''? state.masterList : state.masterList
                    .filter(master =>
                        ( master.name.toUpperCase().indexOf(action.payload.toUpperCase())>-1) )
                };
            case DELETE_MASTER_ERROR:
                return {
                    ...state,
                    loading: false,
                    master:null,
                    error: action.payload
                };
            case LOADING:
            return{
                ...state,
                loading:true
            };

            case GET_MASTER_ERROR:
            case ADD_MASTER_ERROR:
            return {
                ...state,
                loading:false,
                error: action.payload
            };

        default:
            return state;
    }
}