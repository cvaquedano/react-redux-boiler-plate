import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {addMasterStatusAction} from '../../actions/masterStatusActions';
import {showAlertAction, hideAlertAction} from '../../actions/alertActions';
import Spinner from '../layout/Spinner';

const MasterStatusNew = ({history}) => {

    const [masterStatus, setMasterStatus] = useState({
        value: '',
        description: ''
    });
    const {value, description}= masterStatus;

     const dispatch = useDispatch();

     // acceder al state del store
     const loading = useSelector(state=> state.masterStatus.loading);


     const alert = useSelector(state=> state.alerts.alert)

    const addMasterStatus= data => dispatch(addMasterStatusAction(data));

    const onChangeFormulario = e =>{
        setMasterStatus({
            ...masterStatus,
            [e.target.name] : e.target.value
        })
    }

    const submitNuevoProducto = e =>{
        e.preventDefault();

        if(value.trim() === '' || description.trim() === ''){
            const alert= {
                msg: 'All fields are requered',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(showAlertAction(alert));
            return;
        }

        dispatch(hideAlertAction());

        addMasterStatus({
            value, description
        });

        history.push('/status')

    }
    return (
       <div className='row justify-content-center'>
           <div className='col-md-8'>
               <div className='card-body'>
                   <h2 className='text-center mb-4 font-weight-bold'>
                       Add New Master Status
                   </h2>

                   {alert ? <p className={alert.classes}>{alert.msg}</p>: null}
                   <form
                    onSubmit={submitNuevoProducto}
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
                                placeholder='Status Description'
                                name='description'
                                value={description}
                                onChange={onChangeFormulario}
                            />
                       </div>
                       <button
                            type='submit'
                            className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                        >
                            Add
                       </button>
                   </form>
                   { loading ? <Spinner/> : null}
               </div>
           </div>
       </div>
    );
};


export default MasterStatusNew;