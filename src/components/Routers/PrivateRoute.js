import React,{useContext, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...props}) => {
    return (
        <Route
        {...props}
        render={
            props => false ?
            ( <Redirect to="/"/>)
            :
            (<Component {...props}/>)
            }
        >
        </Route>
    );
};

export default PrivateRoute;