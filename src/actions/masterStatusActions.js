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
import axiosClient from '../config/axios';
import Swal from 'sweetalert2';

export function addMasterStatusAction(data) {
    return async (dispatch) =>{
        dispatch({
            type: ADD_MASTER_STATUS
        });

        try{
            // insertar en la api
            // todo cuandon lo inserto a la coleccion no tiene id.
            const respuesta = await axiosClient.post('/api/MasterStatus/post',data);

            dispatch({
                type: ADD_MASTER_STATUS_SUCCESS,
                payload: respuesta.data
            });

            Swal.fire(
                'SUCCESS',
                'Master status added successfully',
                'success'
            );

        } catch(error){
            console.log(error);
            dispatch({
                type: ADD_MASTER_STATUS_ERROR,
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

export function getMasterStatusAction(){
    return async (dispatch) =>{
        dispatch({
            type: GET_MASTER_STATUS
        });

        try{
            const respuesta = await axiosClient.get('/api/MasterStatus');
            dispatch({
                type: GET_MASTER_STATUS_SUCCESS,
                payload: respuesta.data
            });

        } catch(error){
            console.log(error);
            dispatch({
                type: GET_MASTER_STATUS_ERROR,
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

export function setActualMasterStatus(data){
    return (dispatch) =>{
        dispatch({
            type:SET_ACTUAL_MASTER_STATUS,
            payload:data
        })
    }
}

export function deleteMasterStatusAction(id){
    return async (dispatch) =>{

        dispatch({
            type: DELETE_MASTER_STATUS,
            payload: id
        });

        try{
            // borrar de la api
            await axiosClient.delete(`/api/MasterStatus/${id}`);
            dispatch({
                type: DELETE_MASTER_STATUS_SUCCESS,
                payload: id
            });

            Swal.fire('Deleted!',
            'Registro Eliminado',
            'success'
            )

        } catch(error){
            console.log(error);
            dispatch({
                type: DELETE_MASTER_STATUS_ERROR,
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


export function editMasterStatusAction(data){
    return async (dispatch) => {
        dispatch({

            type: EDIT_MASTER_STATUS,
            payload: data

        });
        try {

            await axiosClient.put(`/api/MasterStatus/${data.id}`,data);
            dispatch({

                type: EDIT_MASTER_STATUS_SUCCESS,
                payload: data
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type: EDIT_MASTER_STATUS_ERROR,
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