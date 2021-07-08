import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {filterMasterDetailAction} from '../../../actions/masterDetailActions';


const MasterDetailHeader = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const master = useSelector(state=> state.master.master);
    const {id} = master;

    const [filterValue, setFilterValue] = useState('');

    const goToNew = () =>{
        history.push(`/master/${id}/detail/new`);
    }
    const filterValueChange = e =>{
        setFilterValue(
            e.target.value
        );
    }
    const filterList = () =>{
        dispatch(filterMasterDetailAction(filterValue));
    };
    const filterkeyPress = e =>{
        if(e.Key === 'Enter'){
            filterList();
        }
    };
    const filerSubmit = e =>{
        e.preventDefault();
        filterList();
    }
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-primary justify-content-between'>
            <div  >
                <form class="form-inline my-2 my-lg-0" onSubmit={filerSubmit}>
                    <input
                        autoFocus
                        class="form-control mr-sm-2"
                        name='filterValue'
                        type="text"
                        placeholder="Filter"
                        value={filterValue}
                        onChange={filterValueChange}
                        onKeyPress={filterkeyPress}
                        />
                    <button class="btn btn-secondary my-2 my-sm-0" type="button" onClick={filterList}>Filter</button>
                </form>
            </div>
            <form class="form-inline my-2 my-lg-0">
                <button class="btn btn-secondary my-2 my-sm-0" type="button" onClick={goToNew}>Add New</button>
            </form>
        </nav>
    );
};

export default MasterDetailHeader;