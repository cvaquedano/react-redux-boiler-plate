import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {editMasterDetailAction} from '../../../actions/masterDetailActions';
import {showAlertAction, hideAlertAction} from '../../../actions/alertActions';

import Spinner from '../../layout/Spinner';



const MasterDetailEdit = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    // state local
    const [masterDetail, setMasterDetail] = useState({
        value: '',
        quantity: 0,
        price: 0,
        total:0
    });

    const MasterDetailToEdit = useSelector(state => state.masterDetail.masterDetail);
    const loading = useSelector(state=> state.masterDetail.loading);
    const master = useSelector(state=> state.master.master);
    const alert = useSelector(state=> state.alerts.alert);

    useEffect(()=>{

        setMasterDetail(MasterDetailToEdit)
    },[MasterDetailToEdit]);

    // al recargar la pagina pueda que el state se pierda y de un error
    if(!masterDetail) return null;
    const {value, quantity, price, total} = masterDetail;

    const submitEdit = e => {
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

        dispatch(editMasterDetailAction(master.id, masterDetail));

        history.push(`/master/${master.id}/detail`);
    };

    const updateState = e =>{
        setMasterDetail({
            ...masterDetail,
            [e.target.name] : isNaN(e.target.value) ? e.target.value : Number( e.target.value)
        })
    }
    return (
        <div className='row justify-content-center'>
           <div className='col-md-8'>
               <div className='card-body'>
                   <h2 className='text-center mb-4 font-weight-bold'>
                       Edit Master Detail
                   </h2>
                   {alert ? ( <div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
                   {loading ?  <Spinner/> : null}
                   <form
                    onSubmit={submitEdit}
                   >
                       <div className='form-group'>
                           <label>Value</label>
                           <input
                                type='text'
                                className='form-control'
                                placeholder='Detail Value'
                                name='value'
                                value={value}
                                onChange={updateState}
                            />
                            <label>Quantity</label>
                            <input
                                type='number'
                                className='form-control'
                                name='quantity'
                                value={quantity}
                                onChange={updateState}
                            />
                            <label>Price</label>
                            <input
                                type='number'
                                className='form-control'
                                name='price'
                                value={price}
                                onChange={updateState}
                            />
                            <label>Total</label>
                            <input
                                type='number'
                                className='form-control'
                                name='total'
                                value={total}
                                onChange={updateState}
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



export default MasterDetailEdit;