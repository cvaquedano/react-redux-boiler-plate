import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {signUpAction} from '../../actions/authActions';
import {showAlertAction, hideAlertAction} from '../../actions/alertActions';

const SignUp = (props) => {

    const [user, setUser] = useState({
        firstName:'',
        lastName:'',
        email:'',
        username:'',
        password:'',
        confirm:''
    });

    const {firstName, lastName, email, username, password, confirm} = user;
    const [passwordClasses, setPasswordClasses] = useState({
        inputClass:'form-control',
        feedbackClass:'',
        feedbackmessage:''
    });
    const [passwordMatchClasses, setPasswordMatchClasses] = useState({
        passwordMatchinputClass:'form-control',
        passwordMatchfeedbackClass:'',
        passwordMatchfeedbackmessage:''
    });
    const {inputClass, feedbackClass, feedbackmessage} = passwordClasses;
    const {passwordMatchinputClass, passwordMatchfeedbackClass, passwordMatchfeedbackmessage} = passwordMatchClasses;

    const dispatch = useDispatch();
    const alert = useSelector(state=> state.alerts.alert);
    const loading = useSelector(state=> state.auth.loading);
    const signUp= data => dispatch(signUpAction(data));

    const validatePassword = e=>{
            if(e.target.value.length === 0){
                setPasswordClasses({
                    ...passwordClasses,
                    inputClass : 'form-control',
                    feedbackClass : '',
                    feedbackmessage : ""
                });
                return;
            }
            if(e.target.value.length >= 6){
                setPasswordClasses({
                    ...passwordClasses,
                    inputClass : 'form-control is-valid',
                    feedbackClass : 'valid-feedback',
                    feedbackmessage : "Success! You've done it."
                });
                return;
            }
            setPasswordClasses({
                ...passwordClasses,
                inputClass : 'form-control is-invalid',
                feedbackClass : 'invalid-feedback',
                feedbackmessage : "Sorry! You must meet the rules of the password."
            });

    }

    const validatePasswordMatch = e =>{
        if(e.target.value.length === 0){
            setPasswordMatchClasses({
                ...passwordMatchClasses,
                passwordMatchinputClass : 'form-control',
                passwordMatchfeedbackClass : '',
                passwordMatchfeedbackmessage : ""
            });
            return;
        }
        if(password!==e.target.value){
            setPasswordMatchClasses({
                ...passwordMatchClasses,
                passwordMatchinputClass : 'form-control is-invalid',
                passwordMatchfeedbackClass : 'invalid-feedback',
                passwordMatchfeedbackmessage : "Sorry! Passwords must match!"
            });
        }else{
            setPasswordMatchClasses({
                ...passwordMatchClasses,
                passwordMatchinputClass : 'form-control is-valid',
                passwordMatchfeedbackClass : 'valid-feedback',
                passwordMatchfeedbackmessage : "OK! Everything is fine!"
            });
        }
    }

    const onChange = e =>{
        setUser({
            ...user,
            [e.target.name] : e.target.value
        });
        if(e.target.name === 'password'){
            validatePassword(e);
        }
        if(e.target.name === 'confirm'){
            validatePasswordMatch(e);
        }

    }

    const goTologin = () =>{
        props.history.push('/');
    }

    const onsubmit=  e =>{
        e.preventDefault();

        // validate empty fields
        if(firstName.trim() === ''
        || lastName.trim() === ''
        || username.trim() === ''
        || email.trim() === ''
        || password.trim() === ''
        || confirm.trim()===''){

            const alert= {
                msg: 'All fields are required.',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(showAlertAction(alert));
            return;

        }


        if(password.length < 6 ){
            const alert= {
                msg: 'Password must be at least 6 character.',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(showAlertAction(alert));
            return;
        }

        if(password !== confirm){
            const alert= {
                msg: 'Passwords must match.',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(showAlertAction(alert));
            return;
        }
        dispatch(hideAlertAction());
        signUp({firstName, lastName, username, password, email})
        props.history.push('/');

    }
    return (
        <div>
        <h1>Sign up</h1>
        {alert ? <p className={alert.classes}>{alert.msg}</p>: null}
        <form onSubmit={onsubmit}>
         <fieldset>
            <div class="form-group">
             <label for="firstName">First Name</label>
             <input
                type="text"
                class="form-control"
                id="firstName"
                name='firstName'
                placeholder="Enter First Name"
                value={firstName}
                onChange={onChange}/>
             </div>
             <div class="form-group">
             <label for="lastName">Last Name</label>
             <input type="text" class="form-control" id="lastName" name='lastName'placeholder="Enter Last Name" value={lastName}
                onChange={onChange}/>
             </div>
             <div class="form-group">
             <label for="username">User name</label>
             <input type="text" class="form-control" id="username" name='username' placeholder="Enter user name" value={username}
                onChange={onChange}/>
             </div>
             <div class="form-group">
             <label for="email">Email address</label>
             <input type="email" class="form-control" id="email" name='email' aria-describedby="emailHelp"
             placeholder="Enter email"
             value={email}
             onChange={onChange}/>
             <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
             </div>

            <div class="form-group">
            <label class="form-control-label" for="password">Password</label>
            <input
            aria-describedby="passwordHelp"
            type="password"
            class= {inputClass}
            id="password" name='password'
            value={password}
            onChange={onChange}/>
            <small id="passwordHelp" class="form-text text-muted">most have at least 6 characters.</small>
            {feedbackClass !== '' ? <div class={feedbackClass}>{feedbackmessage}</div> :null}
            </div>

            <div class="form-group">
            <label class="form-control-label" for="confirm">Confirm Password</label>
            <input
            type="password"
            name='confirm'
            value={confirm}
            onChange={onChange}
            class= {passwordMatchinputClass}
            id="confirm"/>
            {passwordMatchfeedbackClass !== '' ? <div class={passwordMatchfeedbackClass}>{passwordMatchfeedbackmessage}</div> :null}
            </div>
             <button type="submit" class="btn btn-primary">Submit</button>
             <button type="button" onClick={goTologin} class="btn btn-link">Login</button>
         </fieldset>
         </form>
         { loading ? <p>loading...</p> : null}
     </div>
    );
};

export default SignUp;