import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {loginAction} from '../../actions/authActions';
import {showAlertAction, hideAlertAction} from '../../actions/alertActions';

const Login = (props) => {

    const [user, setUser] = useState({
        username:'',
        password:''
    });
    const {username, password} = user;

    const dispatch = useDispatch();

    const loading = useSelector(state=> state.auth.loading);
    const authenticated  = useSelector(state=> state.auth.authenticated );

    const alert = useSelector(state=> state.alerts.alert)

    const login= data => dispatch(loginAction(data));

    useEffect(()=>{
        if(authenticated){
            props.history.push('/main');
        }

    }, [props, authenticated]);

    const onChange = e =>{
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })

    }

    const goToSignUp = () =>{
        props.history.push('/signup');
    }

    const onsubmit=  e =>{
        e.preventDefault();

        // validate empty fields
        if(username.trim() === ''|| password.trim() === ''){

            const alert= {
                msg: 'All fields are required.',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(showAlertAction(alert));
            return;

        }
        dispatch(hideAlertAction());
        login({username, password, email:username})

    }

    return (
        <div>
            <h1>Login</h1>
            {alert ? <p className={alert.classes}>{alert.msg}</p>: null}
           <form onSubmit={onsubmit}>
            <fieldset>
                <div class="form-group">
                <label for="username">Email address or user name</label>
                <input
                type="text"
                class="form-control"
                id="username"
                name='username'
                placeholder="Enter email or user name"
                value={username}
                onChange={onChange}/>
                </div>
                <div class="form-group">
                <label for="password">Password</label>
                <input
                type="password"
                class="form-control"
                id="password"
                name='password'
                placeholder="Password"
                value={password}
                onChange={onChange}/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" onClick={goToSignUp} class="btn btn-link">Sign up</button>
            </fieldset>
            </form>
            { loading ? <p>loading...</p> : null}
        </div>
    );
};

export default Login;