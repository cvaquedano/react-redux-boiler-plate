import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import {useDispatch} from 'react-redux';
import {deleteMasterStatusAction, setActualMasterStatus} from '../../actions/masterStatusActions';


const MasterStatus = ({masterStatus}) => {

    const {value, description, id} = masterStatus;

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
            confirmButtonText:'Si, borrarlo!'
        }).then((result)=>{
            if(result.value){

                dispatch(deleteMasterStatusAction(id));
            }
        });

    }

    // funcion que redirige de forma programada
    const redireccionarEdicion = data => {

        dispatch(setActualMasterStatus(data));
        history.push(`/status/edit/${data.id}`);
    }
    return (
        <tr>
            <td className='capitalize'>{value}</td>
            <td className='capitalize'>{description}</td>
            <td className="acciones">
            <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => redireccionarEdicion(masterStatus)}
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

export default MasterStatus;