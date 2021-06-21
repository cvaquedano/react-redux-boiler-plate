import React from 'react';

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
           <form>
            <fieldset>
                <div class="form-group">
                <label for="username">Email address or user name</label>
                <input type="email" class="form-control" id="username" name='username' aria-describedby="emailHelp" placeholder="Enter email or user name"/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" name='password' placeholder="Password"/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-link">Sign up</button>
            </fieldset>
            </form>
        </div>
    );
};

export default Login;