import React, { useState } from 'react';

import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {logoutAction} from '../../actions/authActions';

const Navbar = () => {

    const [navbar, setNavbar] = useState({
        navBarToggler:'navbar-toggler collapsed',
        ariaExpandable: false,
        navBarCollapse:'navbar-collapse collapse'
    });
    const {navBarToggler, ariaExpandable, navBarCollapse} = navbar
    const dispatch = useDispatch();
    const logout= () => dispatch(logoutAction());

    const logOut = () =>{
        logout();
    }

    const toggler = () =>{
        if(ariaExpandable){

            setNavbar({
                ...navbar,
                navBarToggler:'navbar-toggler collapsed',
                ariaExpandable: false,
                navBarCollapse:'navbar-collapse collapse'
            });

        }else{

            setNavbar({
                ...navbar,
                navBarToggler:'navbar-toggler',
                ariaExpandable: true,
                navBarCollapse:'navbar-collapse collapse show'
            })

        }
    }

    return (

            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                 <NavLink class="navbar-brand"
                        to="/main">
                        Navbar
                    </NavLink>
            <button class={navBarToggler} type="button" data-toggle="collapse"
            onClick={toggler}
            data-target="#navbarColor01" aria-controls="navbarColor01"
            aria-expanded={ariaExpandable} aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class={navBarCollapse} id="navbarColor01">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                <NavLink class="nav-link"
                        to="/main">
                        Home
                        <span class="sr-only">(current)</span>
                    </NavLink>
                </li>
                <li class="nav-item">
                <NavLink  class="nav-link"
                        to="/master">
                        Master
                    </NavLink>
                </li>
                <li class="nav-item">
                <NavLink  class="nav-link"
                        to="/status">
                        Status
                    </NavLink>
                </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                <button class="btn btn-secondary my-2 my-sm-0" type="button" onClick={logOut} >Log out</button>
                </form>
            </div>
            </nav>

    );
};

export default Navbar;