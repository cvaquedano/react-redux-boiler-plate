import React,{useEffect}
from 'react';
import { useDispatch,    useSelector } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import {usuarioAutenticado} from '../../actions/authActions';

const PrivateRoute = ({component: Component, ...props}) => {

    const authenticated  = useSelector(state=> state.auth.authenticated );
    const dispatch = useDispatch();
   // const getUser= () => dispatch(usuarioAutenticado());

   // todo si refresco la pantalla, y existe un token en memoria, deberia de entrar a la pagina principal
    useEffect(()=> {

        const getUser = () => dispatch(usuarioAutenticado());

        getUser();
        //getUser();
        // eslint-disable-next-line
    },[]);

    return (
        <Route
        {...props}
        render={
            props => !authenticated ?
            ( <Redirect to="/"/>)
            :
            (<Component {...props}/>)
            }
        >
        </Route>
    );
};

export default PrivateRoute;