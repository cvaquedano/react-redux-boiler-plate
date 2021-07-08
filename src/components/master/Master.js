import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import {useDispatch} from 'react-redux';
import {deleteMasterAction, setActualMaster} from '../../actions/masterActions';


const Master = ({master}) => {

    const {id, name, dob, gender, }= master

    const dispatch = useDispatch();
    const history = useHistory();

    const confirmarEliminarData = id =>{

        Swal.fire({
            title:'Estas seguro de eliminar?',
            text:'No podras reversar esta accion!',
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'#d33',
            confirmButtonText:'Yes, Delete it!'
        }).then((result)=>{
            if(result.value){

                dispatch(deleteMasterAction(id));
            }
        });

    }

    // funcion que redirige de forma programada
    const redirectToEditMaster = data => {

        dispatch(setActualMaster(data));
        history.push(`/master/edit/${data.id}`);
    }
    const redirectoToMasterDetail = master => {

        dispatch(setActualMaster(master));
        history.push(`/master/${master.id}/detail`);
    }
    return (
        <tr>
            <td className='capitalize'>{name}</td>
            <td > {dob.slice(0,10)}</td>
            <td>{gender ? 'Male' : 'Female'}</td>
            <td className="acciones">
                <button
                    type="button"
                    className="btn btn-info mr-2"
                    onClick={() => redirectoToMasterDetail(master)}
                >
                    Detail
                </button>
                <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={() => redirectToEditMaster(master)}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarData(id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};


export default Master;