import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import {showAlertAction, hideAlertAction} from '../../../actions/alertActions';
import {addMasterDetailAction} from '../../../actions/masterDetailActions';
import Spinner from '../../layout/Spinner';



const MasterDetailNew = () => {

    const [masterDetailLocal, setMasterDetailLocal] = useState({
        value: '',
        quantity: 0,
        price: 0,
        total: 0,
    });

    const {value, quantity, price, total } = masterDetailLocal;


    const alert = useSelector(state=> state.alerts.alert);
    const loading = useSelector(state=> state.masterDetail.loading);
    const master = useSelector(state=> state.master.master);


    const dispatch = useDispatch();
    const history = useHistory()

    const addMasterDetail= (id,data) => dispatch(addMasterDetailAction(id, data));


    const submitNewMasterStatus = e =>{
        e.preventDefault();

        if(value.trim() === '' ||
        quantity === 0||
        price === 0 ||
        total === 0 ){
            const alert= {
                msg: 'All fields are requered',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(showAlertAction(alert));
            return;
        }

        dispatch(hideAlertAction());


        addMasterDetail(master.id, masterDetailLocal);

        history.push(`/master/${master.id}/detail`)

    }
    const updateState = e =>{

        setMasterDetailLocal({
            ...masterDetailLocal,
            [e.target.name] : isNaN(e.target.value) ? e.target.value : Number( e.target.value)
        })
    }
    return (
        <div className='row justify-content-center'>
           <div className='col-md-8'>
               <div className='card-body'>
                   <h2 className='text-center mb-4 font-weight-bold'>
                       Add New Master
                   </h2>
                   {alert ? ( <div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
                   <form
                    onSubmit={submitNewMasterStatus}
                   >
                       <div className='form-group'>
                           <label>Value</label>
                           <input
                                type='text'
                                className='form-control'
                                placeholder='Value of the detail.'
                                name='value'
                                value={value}
                                onChange={updateState}
                            />
                            <label>quantity</label>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Quantity'
                                name='quantity'
                                value={quantity}
                                onChange={updateState}
                            />
                            <label>Price</label>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Price'
                                name='price'
                                value={price}
                                onChange={updateState}
                            />
                           <label>Total</label>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Total'
                                name='total'
                                value={total}
                                onChange={updateState}
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


export default MasterDetailNew;
