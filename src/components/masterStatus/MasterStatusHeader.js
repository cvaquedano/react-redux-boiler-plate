import React from 'react';
import { useHistory } from 'react-router-dom';


const MasterStatusHeader = () => {
    const history = useHistory();

    const goToNew = () =>{
        history.push('/status/new');
    }
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-primary justify-content-between'>
            <div  >
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Filter"/>
                    <button class="btn btn-secondary my-2 my-sm-0" type="button">Filter</button>
                </form>
            </div>
            <form class="form-inline my-2 my-lg-0">
                <button class="btn btn-secondary my-2 my-sm-0" type="button" onClick={goToNew}>Add New</button>
            </form>
        </nav>
    );
};

export default MasterStatusHeader;