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

    FILTER_MASTER
} from '../types';
import axiosClient from '../config/axios';
import Swal from 'sweetalert2';

export function addMasterAction(data) {
    return async (dispatch) =>{
        dispatch({
            type: ADD_MASTER
        });

        try{
            // insertar en la api
            const respuesta = await axiosClient.post('/api/Master/post',data);

            dispatch({
                type: ADD_MASTER_SUCCESS,
                payload: respuesta.data
            });

            Swal.fire(
                'SUCCESS',
                'Master  added successfully',
                'success'
            );

        } catch(error){
            console.log(error);
            dispatch({
                type: ADD_MASTER_ERROR,
                payload: true
            });
            Swal.fire({
                icon:'error',
                title: 'Hubo un error',
                text: error.response.data.message
                }
            );

        }
    }
}

export function getMasterAction(){
    return async (dispatch) =>{
        dispatch({
            type: GET_MASTER
        });

        try{
            const respuesta = await axiosClient.get('/api/Master');
            dispatch({
                type: GET_MASTER_SUCCESS,
                payload: respuesta.data
            });

        } catch(error){
            console.log(error);
            dispatch({
                type: GET_MASTER_ERROR,
                payload: error
            });
            Swal.fire({
                icon:'error',
                title: 'Hubo un error',
                text: error.response.data.message
                }
            );

        }
    }
}

export function setActualMaster(data){
    return (dispatch) =>{
        dispatch({
            type:SET_ACTUAL_MASTER,
            payload:data
        })
    }
}


export function filterMasterAction(data){
    return (dispatch) =>{
        dispatch({
            type:FILTER_MASTER,
            payload:data
        })
    }
}
export function deleteMasterAction(id){
    return async (dispatch) =>{

        dispatch({
            type: DELETE_MASTER,
            payload: id
        });

        try{
            // borrar de la api
            await axiosClient.delete(`/api/Master/${id}`);
            dispatch({
                type: DELETE_MASTER_SUCCESS,
                payload: id
            });

            Swal.fire('Deleted!',
            'Registro Eliminado',
            'success'
            )

        } catch(error){
            console.log(error);
            dispatch({
                type: DELETE_MASTER_ERROR,
                payload: error
            });
            Swal.fire({
                icon:'error',
                title: 'Hubo un error',
                text: error.response.data.message
                }
            );

        }
    }
}


export function editMasterAction(data){
    return async (dispatch) => {
        dispatch({

            type: EDIT_MASTER,
            payload: data

        });
        try {

            if(data.genderText==='1'){
                data.gender = Boolean(true);
            } else {
                data.gender = Boolean(false);
            }

            data.name = `${data.firstName.trim()} ${data.lastName.trim()}`;

            await axiosClient.put(`/api/Master/${data.id}`,data);
            dispatch({

                type: EDIT_MASTER_SUCCESS,
                payload: data
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type: EDIT_MASTER_ERROR,
                payload: error
            });
            Swal.fire({
                icon:'error',
                title: 'Hubo un error',
                text: error.response.data.message
                }
            );
        }
    }
}