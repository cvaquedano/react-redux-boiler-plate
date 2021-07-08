/* eslint-disable import/no-anonymous-default-export */
import {
    GET_MASTER_DETAIL,
    GET_MASTER_DETAIL_SUCCESS,
    GET_MASTER_DETAIL_ERROR,

    ADD_MASTER_DETAIL,
    ADD_MASTER_DETAIL_SUCCESS,
    ADD_MASTER_DETAIL_ERROR,



    SET_ACTUAL_MASTER_DETAIL,

    EDIT_MASTER_DETAIL,
    EDIT_MASTER_DETAIL_SUCCESS,
    EDIT_MASTER_DETAIL_ERROR,

    DELETE_MASTER_DETAIL,
    DELETE_MASTER_DETAIL_SUCCESS,
    DELETE_MASTER_DETAIL_ERROR,
    LOADING,
    FILTER_MASTER_DETAIL

} from '../types';

// cada reducer tiene su propio state

const initialState = {
    masterDetailListFiltered:[],
    masterDetailList:[],
    masterDetail: null,
    error: null,
    loading: false,
};

export default function(state= initialState, action){
    switch(action.type){

            case GET_MASTER_DETAIL:
            case ADD_MASTER_DETAIL:
            case EDIT_MASTER_DETAIL:
            case DELETE_MASTER_DETAIL:
            return {
                ...state,
                loading:true
            };

            case ADD_MASTER_DETAIL_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    masterDetailList : [...state.masterDetailList, action.payload],
                    masterDetailListFiltered : [...state.masterDetailList, action.payload]
                };


            case GET_MASTER_DETAIL_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    masterDetailList :  action.payload,
                    masterDetailListFiltered : action.payload
                };


            case SET_ACTUAL_MASTER_DETAIL:
            return{
                ...state,
                masterDetail: action.payload
            };

            case EDIT_MASTER_DETAIL_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    masterDetail: null,
                    masterDetailList : state.masterDetailList.map(masterDetail =>
                        masterDetail.id === action.payload.id ? masterDetail = action.payload :
                        masterDetail
                    ),
                    masterDetailListFiltered : state.masterDetailList.map(masterDetail =>
                        masterDetail.id === action.payload.id ? masterDetail = action.payload :
                        masterDetail
                    )
                };

            case EDIT_MASTER_DETAIL_ERROR:
                return {
                    ...state,
                    loading: false,
                    masterDetail:null,
                    error: action.payload
                };


            case DELETE_MASTER_DETAIL_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    masterDetailList: state.masterDetailList.filter(Detail => Detail.id !== action.payload),
                    masterDetailListFiltered: state.masterDetailList.filter(Detail => Detail.id !== action.payload),
                    masterDetail:null
                };
            case FILTER_MASTER_DETAIL:
                return {
                    ...state,
                    masterDetailListFiltered: action.payload.trim()===''? state.masterDetailList : state.masterDetailList
                    .filter(Detail =>
                        (Detail.value.toUpperCase().indexOf(action.payload.toUpperCase())>-1)
                        )
                };
            case DELETE_MASTER_DETAIL_ERROR:
                return {
                    ...state,
                    loading: false,
                    masterDetail:null,
                    error: action.payload
                };
            case LOADING:
            return{
                ...state,
                loading:true
            };

            case GET_MASTER_DETAIL_ERROR:
            case ADD_MASTER_DETAIL_ERROR:
            return {
                ...state,
                loading:false,
                error: action.payload
            };

        default:
            return state;
    }
}