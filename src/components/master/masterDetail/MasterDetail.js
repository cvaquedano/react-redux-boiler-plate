import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {deleteMasterDetailAction, setActualMasterDetailAction} from '../../../actions/masterDetailActions';


const MasterDetail = ({masterDetail}) => {

    const {id, value, quantity, price, total }= masterDetail;
    const master = useSelector(state=> state.master.master);

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

                dispatch(deleteMasterDetailAction(master.id, id));
            }
        });

    }

    // funcion que redirige de forma programada
    const redirectToEditmasterDetail = data => {

        dispatch(setActualMasterDetailAction(data));
        history.push(`/master/${master.id}/detail/edit/${masterDetail.id}`);
    }

    return (
        <tr>
            <td className='capitalize'>{value}</td>
            <td>{quantity}</td>
            <td>$ {price}</td>
            <td>$ {total}</td>
            <td className="acciones">
                <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={() => redirectToEditmasterDetail(masterDetail)}
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


export default MasterDetail;