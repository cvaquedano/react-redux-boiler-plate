import React, {  useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getMasterStatusByIdAction} from  '../../../actions/masterStatusActions';

const MasterReadOnlyHeader = () => {

    const master = useSelector(state=> state.master.master);
    const masterStatus = useSelector(state=> state.masterStatus.masterStatus);
    const {name, dob, masterStatusEntityId, gender } = master;

    const dispatch = useDispatch();

    useEffect(()=>{
        const getMasterStatusById = id => dispatch(getMasterStatusByIdAction(id));

        getMasterStatusById(masterStatusEntityId);
        // eslint-disable-next-line
    },[])

    return (
        <div class="form-group">
            <fieldset>
            <label class="control-label" for="name">Name</label>
            <input class="form-control capitalize" id="name" type="text" value={name} readonly=""/>
            </fieldset>
            <fieldset>
            <label class="control-label" for="dob">DOB</label>
            <input class="form-control" id="dob" type="text" value={dob.slice(0,10)} readonly=""/>
            </fieldset>
            <fieldset>
            <label class="control-label" for="gender">Gender</label>
            <input class="form-control" id="gender" type="text" value={ gender? "Male" : "Female"} readonly=""/>
            </fieldset>
            <fieldset>
            <label class="control-label" for="status">Status</label>
            <input class="form-control" id="status" type="text" value={masterStatus ? masterStatus.value: null } readonly=""/>
            </fieldset>
      </div>
    );
};

export default MasterReadOnlyHeader;