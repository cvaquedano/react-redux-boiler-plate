/* eslint-disable import/no-anonymous-default-export */
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    LOGOUT,
    LOADING

} from '../types';

// cada reducer tiene su propio state

const initialState = {
    token: localStorage.getItem('token'),
    authenticated: null,
    user: null,
    loading: false
};

export default function(state= initialState, action){
    switch(action.type){

        case GET_USER:
        case SIGNUP:
        case LOGIN:
            return {
                ...state,
                authenticated: false,
                loading:true
            };

        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                authenticated: true,
                loading:false
            }

        case LOGOUT:
        case SIGNUP_ERROR:
        case GET_USER_ERROR:
        case LOGIN_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                user: null,
                authenticated: null,
                loading:false
            }

        case GET_USER_SUCCESS:
            return{
                ...state,
                authenticated: true,
                user: action.payload,
                loading:false
            }

        case LOADING:
        return{
            ...state,
            loading:true
        }

        default:
            return state;
    }
}