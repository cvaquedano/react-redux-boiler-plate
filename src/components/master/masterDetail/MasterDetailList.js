import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getMasterDetailAction} from  '../../../actions/masterDetailActions';
import Spinner from '../../layout/Spinner';
import MasterDetail from './MasterDetail';
import MasterDetailHeader from './MasterDetailHeader';
import MasterReadOnlyHeader from './MasterReadOnlyHeader';


const MasterDetailList = () => {
    const dispatch = useDispatch();

    const loading = useSelector(state=> state.masterDetail.loading);
    const master = useSelector(state=> state.master.master);
    const masterDetailListFiltered = useSelector(state=> state.masterDetail.masterDetailListFiltered);

    useEffect(()=> {
        const getMasterDetail = id => dispatch(getMasterDetailAction(id));

        getMasterDetail(master.id);
         // eslint-disable-next-line
    },[]);

    return (
       <Fragment>
           <div className='header'>
            <MasterDetailHeader/>
            {loading ? <Spinner/>: null}
           </div>
           <div className='header'>
               <MasterReadOnlyHeader/>
           </div>
           <table className='table table-hover'>
               <thead className='bg-primary table-dark'>
                   <tr>
                       <th scope='col'>Value</th>
                       <th scope='col'>Quantity</th>
                       <th scope='col'>Price</th>
                       <th scope='col'>Total</th>
                       <th scope='col'>Actions</th>
                   </tr>
               </thead>
               <tbody>
                   { masterDetailListFiltered.length ===0 ? 'No rows to show' : (
                       masterDetailListFiltered.map(masterDetail => (
                           <MasterDetail
                            key={masterDetail.id}
                            masterDetail={masterDetail}
                           />
                       ))
                   )}

               </tbody>
           </table>
       </Fragment>
    );
};


export default MasterDetailList;