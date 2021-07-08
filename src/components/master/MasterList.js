import React, { Fragment, useEffect } from 'react';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {getMasterAction} from  '../../actions/masterActions';
import Spinner from '../layout/Spinner';
import Master from './Master';
import MasterHeader from './MasterHeader';

const MasterList = () => {

    const dispatch = useDispatch();

     // acceder al state del store
     const loading = useSelector(state=> state.master.loading);
     const error = useSelector(state=> state.master.error);
     const masterListFiltered = useSelector(state=> state.master.masterListFiltered);

    useEffect(()=>{
        const getMaster = () => dispatch(getMasterAction());

        getMaster();
        // eslint-disable-next-line
    },[])

    return (
       <Fragment>
           <h2 className='text-center my-5'>
               Master
           </h2>
           <div className='header'>
           <MasterHeader/>
           </div>
           { error ? <p className="font-weight-bold alert alert-danger text-center">Hubo un error</p> : null}
           {loading ? <Spinner/> : null}
           <table className='table table-striped'>
               <thead className='bg-primary table-dark'>
                   <tr>
                   <th scope='col'>Name</th>
                       <th scope='col'>DOB</th>
                       <th scope='col'>Gender</th>
                       <th scope='col'>Actions</th>
                   </tr>
               </thead>
               <tbody>
                   { masterListFiltered.length ===0 ? 'No records to show' : (
                       masterListFiltered.map( master=> (
                           <Master
                            key={master.id}
                            master={master}
                           />
                       ))
                   )}

               </tbody>
           </table>
       </Fragment>
    );
};


export default MasterList;