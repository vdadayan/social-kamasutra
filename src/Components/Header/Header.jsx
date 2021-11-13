import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.scss';

const Header = (props) => {
    return(
        <div className="header">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/512px-LEGO_logo.svg.png" alt="lego"/>

            <div className="login-block">
                {props.isAuth ? <button onClick={props.LogOut}>Log out</button> : <NavLink to={'/login'}>Login</NavLink>}
               
            </div>
        </div>
    )
}

export default Header;