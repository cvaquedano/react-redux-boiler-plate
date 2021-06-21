import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


// Redux
import {Provider} from 'react-redux';
import store from './store';
import SignUp from './components/auth/SignUp';
import PrivateRoute from './components/Routers/PrivateRoute';
import MyAppRoutes from './components/Routers/MyAppRoutes';
import Login from './components/auth/Login';

function App() {
  return (
    <Router>
    <Provider store={store}>
    <div className='container mt-5'>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/signup' component={SignUp}/>
        <PrivateRoute
          path='/'
          component={MyAppRoutes}/>
      </Switch>
    </div>
    </Provider>
  </Router>
  );
}

export default App;
