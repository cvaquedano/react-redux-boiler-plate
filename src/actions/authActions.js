import {

    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,

    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,

    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_ERROR,

    LOGOUT

} from '../types';
import clienteAxios from '../config/axios';
import tokenAuth from '../config/tokenAuth';
import Swal from 'sweetalert2';

export function loginAction(datos) {
    return async (dispatch) =>{
        try {

            dispatch({
                type:LOGIN
            });
            const respuesta = await clienteAxios.post('api/users/authenticate',datos);

            dispatch({
                type:LOGIN_SUCCESS,
                payload: respuesta.data
            });

            usuarioAutenticado();

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: true
            })
            Swal.fire({
                icon:'error',
                title: 'Error',
                text: error.response.data.message
                })
        }
    }
}

export function signUpAction(datos) {
    return async (dispatch) =>{
        dispatch({
            type: SIGNUP
        });

        try{
            // insertar en la api
             await clienteAxios.post('/api/users/register',datos);

            dispatch({
                type: SIGNUP_SUCCESS,
                payload: datos
            });

            Swal.fire(
                'Correcto',
                'User add successfully, please login.',
                'success'
            );

        } catch(error){
            console.log(error);
            dispatch({
                type: SIGNUP_ERROR,
                payload: true
            });
            Swal.fire({
                icon:'error',
                title: 'Hubo un error',
                text: 'Hubo un error al insertar registro'
                }
            );

        }
    }
}

export function usuarioAutenticado() {
    return async (dispatch) =>{
        console.log('usuarioAutenticado');
        dispatch({
            type: GET_USER
        });
        const token = localStorage.getItem('token');

        if(token){

            tokenAuth(token);
            try {
                const respuesta = await clienteAxios.get('/api/users');
                console.log('adentro aut');
                console.log(respuesta);
                dispatch({
                    type: GET_USER_SUCCESS,
                    payload: respuesta.datos
                });

            } catch (error) {
                console.log(error);
                dispatch({
                    type: GET_USER_ERROR,
                    payload: true
                });
            }
        }

    }
}

export function logoutAction(){
    return async (dispatch) =>{
        dispatch({
            type: LOGOUT
        });
    }
}