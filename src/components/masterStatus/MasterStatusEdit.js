import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {editMasterStatusAction} from '../../actions/masterStatusActions';

const MasterStatusEdit = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    // state local
    const [status, setStatus] = useState({
        value: '',
        description: ''
    })

    const statusToEdit = useSelector(state => state.masterStatus.masterStatus);

    useEffect(()=>{
        setStatus(statusToEdit)
    },[statusToEdit]);

    // al recargar la pagina pueda que el state se pierda y de un error
    if(!status) return null;
    const {value, description} = status;

    const submitEditStatus = e => {
        e.preventDefault();
        dispatch(editMasterStatusAction(status));

        history.push('/status');
    };

    const onChangeFormulario = e =>{
        setStatus({
            ...status,
            [e.target.name] : e.target.value
        })
    }
    return (
        <div className='row justify-content-center'>
           <div className='col-md-8'>
               <div className='card-body'>
                   <h2 className='text-center mb-4 font-weight-bold'>
                       Edit Status
                   </h2>
                   <form
                    onSubmit={submitEditStatus}
                   >
                       <div className='form-group'>
                           <label>Status Value</label>
                           <input
                                type='text'
                                autoFocus
                                className='form-control'
                                placeholder='Status Value'
                                name='value'
                                value={value}
                                onChange={onChangeFormulario}
                            />
                            <label>Status Description</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='A description for status'
                                name='description'
                                value={description}
                                onChange={onChangeFormulario}
                            />
                       </div>

                       <button
                            type='submit'
                            className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                        >
                            Save Changes
                       </button>
                   </form>
               </div>
           </div>
       </div>
    );
};

export default MasterStatusEdit;