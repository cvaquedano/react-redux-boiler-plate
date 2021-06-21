import React from 'react';

const SignUp = () => {
    return (
        <div>
        <h1>Sign up</h1>
        <form>
         <fieldset>
            <div class="form-group">
             <label for="firstName">First Name</label>
             <input type="text" class="form-control" id="firstName" name='firstName'placeholder="Enter First Name"/>
             </div>
             <div class="form-group">
             <label for="lastName">Last Name</label>
             <input type="text" class="form-control" id="lastName" name='lastName'placeholder="Enter Last Name"/>
             </div>
             <div class="form-group">
             <label for="username">User name</label>
             <input type="text" class="form-control" id="username" name='username' placeholder="Enter user name"/>
             </div>
             <div class="form-group">
             <label for="email">Email address</label>
             <input type="email" class="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email"/>
             <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
             </div>

            <div class="form-group has-success">
            <label class="form-control-label" for="password">Password</label>
            <input aria-describedby="passwordHelp"  type="password" class="form-control is-valid" id="password" name='password'/>
            <small id="passwordHelp" class="form-text text-muted">most have at least 6 characters.</small>
            <div class="valid-feedback">Success! You've done it.</div>
            </div>

            <div class="form-group has-danger">
            <label class="form-control-label" for="confirm">Confirm Password</label>
            <input type="password" value="wrong value" class="form-control is-invalid" id="confirm"/>
            <div class="invalid-feedback">Sorry, that username's taken. Try another?</div>
            </div>
             <button type="submit" class="btn btn-primary">Submit</button>
             <button type="button" class="btn btn-link">Login</button>
         </fieldset>
         </form>
     </div>
    );
};

export default SignUp;