import React from 'react';

const Main = () => {
    return (
        <div class="jumbotron">
            <h1 class="display-3">React Redux boiler plate project.</h1>
            <p >React redux-thunk for use a Middleware to combine diferent reducers.</p>
            <p >React hook (useState,  useEffect and useHistory).</p>
            <p >Nested switch is being used to manage public and private routes.</p>
            <p >Axio is used to connect to the backend api.</p>
            <p >Authentication is handled by token that is stored in the localstore.</p>
            <p > Validation, alerts, messages, loading spinner are components integrated in the project. </p>
            <p>Style is handled by custom css boostrap and styles components. </p>
            <hr class="my-4"/>
            <div className="text-right">

            <p class="lead">You can check source code of both, front end and back end.</p>
            <p class="lead">
                <a class="btn btn-primary btn-lg link" href="https://github.com/cvaquedano/react-boiler-plate" target="_blank" rel="noreferrer noopener" role="button">Front End</a>
                <a class="btn btn-primary btn-lg" href="https://github.com/cvaquedano/netcoreboilerplate" target="_blank" rel="noreferrer noopener" role="button">Back End</a>
            </p>
            </div>
        </div>
    );
};

export default Main;