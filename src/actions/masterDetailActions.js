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

    FILTER_MASTER_DETAIL

} from '../types';
import axiosClient from '../config/axios';
import Swal from 'sweetalert2';

export function addMasterDetailAction(id,data) {
    return async (dispatch) =>{
        dispatch({
            type: ADD_MASTER_DETAIL
        });

        try{
            // insertar en la api
            const respuesta = await axiosClient.post(`/api/master/${id}/MasterDetail`,data);

            dispatch({
                type: ADD_MASTER_DETAIL_SUCCESS,
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
                type: ADD_MASTER_DETAIL_ERROR,
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
};

export function getMasterDetailAction(masterId){
    return async (dispatch) =>{
        dispatch({
            type: GET_MASTER_DETAIL
        });

        try{
            const respuesta = await axiosClient.get(`/api/master/${masterId}/masterDetail`);

            dispatch({
                type: GET_MASTER_DETAIL_SUCCESS,
                payload: respuesta.data
            });

        } catch(error){
            console.log(error);
            dispatch({
                type: GET_MASTER_DETAIL_ERROR,
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
};
export function setActualMasterDetailAction(data){
    return (dispatch) =>{
        dispatch({
            type:SET_ACTUAL_MASTER_DETAIL,
            payload:data
        })
    }
};
export function filterMasterDetailAction(data){
    return (dispatch) =>{
        dispatch({
            type:FILTER_MASTER_DETAIL,
            payload:data
        })
    }
};
export function deleteMasterDetailAction(masterId, id){
    return async (dispatch) =>{

        dispatch({
            type: DELETE_MASTER_DETAIL,
            payload: id
        });

        try{
            // borrar de la api
            await axiosClient.delete(`/api/master/${masterId}/masterdetail/${id}`);
            dispatch({
                type: DELETE_MASTER_DETAIL_SUCCESS,
                payload: id
            });

            Swal.fire('Deleted!',
            'Registro Eliminado',
            'success'
            )

        } catch(error){
            console.log(error);
            dispatch({
                type: DELETE_MASTER_DETAIL_ERROR,
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
};
export function editMasterDetailAction(masterId, data){
    return async (dispatch) => {
        dispatch({

            type: EDIT_MASTER_DETAIL,
            payload: data

        });
        try {

            await axiosClient.put(`/api/master/${masterId}/MasterDetail/${data.id}`,data);
            dispatch({

                type: EDIT_MASTER_DETAIL_SUCCESS,
                payload: data
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type: EDIT_MASTER_DETAIL_ERROR,
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
};