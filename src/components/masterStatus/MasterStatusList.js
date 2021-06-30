import React, { Fragment, useEffect } from 'react';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {getMasterStatusAction} from  '../../actions/masterStatusActions';
import MasterStatus from './MasterStatus';
import MasterStatusHeader from './MasterStatusHeader';

const MasterStatusList = () => {

    const dispatch = useDispatch();

     // acceder al state del store
     const loading = useSelector(state=> state.masterStatus.loading);
     const error = useSelector(state=> state.masterStatus.error);
     const masterStatusList = useSelector(state=> state.masterStatus.masterStatusList);

    useEffect(()=>{
        const getMasterStatus = () => dispatch(getMasterStatusAction());

        getMasterStatus();
        // eslint-disable-next-line
    },[])
    return (
       <Fragment>
           <h2 className='text-center my-5'>
               Master Status
           </h2>
           <div className='header'>
           <MasterStatusHeader/>
           </div>
           { error ? <p className="font-weight-bold alert alert-danger text-center">Hubo un error</p> : null}
           {loading ? <p className='text-center'>Cargando...</p> : null}
           <table className='table table-striped'>
               <thead className='bg-primary table-dark'>
                   <tr>
                       <th scope='col'>Value</th>
                       <th scope='col'>Precio</th>
                       <th scope='col'>Acciones</th>
                   </tr>
               </thead>
               <tbody>
                   { masterStatusList.length ===0 ? 'No status to show' : (
                       masterStatusList.map(status => (
                           <MasterStatus
                            key={status.id}
                            masterStatus={status}
                           />
                       ))
                   )}

               </tbody>
           </table>
       </Fragment>
    );
};


export default MasterStatusList;