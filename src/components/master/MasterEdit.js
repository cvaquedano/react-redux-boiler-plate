import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {editMasterAction} from '../../actions/masterActions';
import {showAlertAction, hideAlertAction} from '../../actions/alertActions';
import {getMasterStatusAction} from  '../../actions/masterStatusActions';

import styled from '@emotion/styled'
import Spinner from '../layout/Spinner';

const InputRadio = styled.input`
   margin: 0 1rem;
`;

const MasterEdit = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    // state local
    const [master, setMaster] = useState({
        firstName: '',
        lastName: '',
        dob:'',
        genderText:'',
        masterStatusEntityId:'',
        gender: Boolean(false)
    });

    const MasterToEdit = useSelector(state => state.master.master);
    const masterStatusList = useSelector(state=> state.masterStatus.masterStatusList);
    const loadingMaster = useSelector(state=> state.master.loading);
    const loadingMasterStatus = useSelector(state=> state.masterStatus.loading);
    const alert = useSelector(state=> state.alerts.alert);

    useEffect(()=>{
        const getMasterStatus = () => dispatch(getMasterStatusAction());

        getMasterStatus();
        // eslint-disable-next-line
    },[])
    useEffect(()=>{
        console.log(MasterToEdit)

        const masterForEdit = {
            id :MasterToEdit.id,
            firstName :MasterToEdit.name.split(' ')[0],
            lastName : MasterToEdit.name.split(' ')[1],
            dob: MasterToEdit.dob.slice(0,10),
            masterStatusEntityId : MasterToEdit.masterStatusEntityId,
            gender: MasterToEdit.gender,
            genderText: MasterToEdit.gender ? '1' : '0'
        }
        setMaster(masterForEdit)
    },[MasterToEdit]);

    // al recargar la pagina pueda que el state se pierda y de un error
    if(!master) return null;
    const {firstName,lastName, dob, genderText, masterStatusEntityId, gender } = master;

    const submitEdit = e => {
        e.preventDefault();

        if(firstName.trim() === '' ||
        lastName.trim() === ''||
        dob.trim() === '' ||
        genderText.trim() ==='' ||
        masterStatusEntityId.trim()===''){
            const alert= {
                msg: 'All fields are requered',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(showAlertAction(alert));
            return;
        }

        dispatch(hideAlertAction());
        if(genderText==='1'){
            setMaster({
                ...master,
                [gender]: Boolean(true)
            })
        }
        else{
            setMaster({
                ...master,
                [gender]: Boolean(false)
            })

        }

        dispatch(editMasterAction(master));

        history.push('/master');
    };

    const updateState = e =>{
        setMaster({
            ...master,
            [e.target.name] : e.target.value
        })
    }
    return (
        <div className='row justify-content-center'>
           <div className='col-md-8'>
               <div className='card-body'>
                   <h2 className='text-center mb-4 font-weight-bold'>
                       Edit Master
                   </h2>
                   {alert ? <p className={alert.classes}>{alert.msg}</p>: null}
                   { (loadingMaster || loadingMasterStatus) ? <Spinner/>: null}
                   <form
                    onSubmit={submitEdit}
                   >
                       <div className='form-group'>
                           <label>First Name</label>
                           <input
                                type='text'
                                autoFocus
                                className='form-control'
                                placeholder='First Name'
                                name='firstName'
                                value={firstName}
                                onChange={updateState}
                            />
                            <label>Last Name</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Last Name'
                                name='lastName'
                                value={lastName}
                                onChange={updateState}
                            />
                            <label>DOB</label>
                            <input
                                type="date"
                                name="dob"
                                className='form-control'
                                onChange={updateState}
                                value={dob}
                            />
                            <div>
                                <label>Gender</label>
                                <InputRadio
                                    type="radio"
                                    name="genderText"
                                    value='1'
                                    checked={genderText === "1"}
                                    onChange={updateState}

                                /> Male
                                <InputRadio
                                    type="radio"
                                    name="genderText"
                                    value='0'
                                    checked={genderText === "0"}
                                    onChange={updateState}
                                /> Female
                            </div>

                            <label>Status</label>
                            <select class="custom-select"
                                onChange={updateState}
                                name="masterStatusEntityId"
                                value={masterStatusEntityId}
                            >
                                <option value="">- Seleccione -</option>
                                {masterStatusList.map(opcion => (
                                    <option key={opcion.Id} value={opcion.id}>{opcion.value}</option>
                                ))}
                            </select>
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


export default MasterEdit;