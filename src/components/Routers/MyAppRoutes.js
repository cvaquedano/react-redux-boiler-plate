import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../layout/Main';
import Navbar from '../layout/Navbar';
import MasterEdit from '../master/MasterEdit';
import MasterList from '../master/MasterList';
import MasterNew from '../master/MasterNew';
import MasterDetailEdit from '../master/masterDetail/MasterDetailEdit';
import MasterDetailList from '../master/masterDetail/MasterDetailList';
import MasterDetailNew from '../master/masterDetail/MasterDetailNew';
import MasterStatusEdit from '../masterStatus/MasterStatusEdit';
import MasterStatusList from '../masterStatus/MasterStatusList';
import MasterStatusNew from '../masterStatus/MasterStatusNew';

const MyAppRoutes = () => {
    return (
       <Switch>
           <div>

               <Navbar />

               <div>
               <Route exact path="/main" component={Main} />

                <Route exact path="/master" component={MasterList} />
                <Route exact path='/master/new' component={MasterNew}/>
                <Route exact path='/master/edit/:id' component={MasterEdit}/>

                <Route exact path="/master/:masterId/detail" component={MasterDetailList} />
                <Route exact path="/master/:masterId/detail/new" component={MasterDetailNew} />
                <Route exact path="/master/:masterId/detail/edit/:id" component={MasterDetailEdit} />

                <Route exact path="/status" component={MasterStatusList} />
                <Route exact path='/status/new' component={MasterStatusNew}/>
                <Route exact path='/status/edit/:id' component={MasterStatusEdit}/>

               </div>
           </div>
       </Switch>
    );
};

export default MyAppRoutes;