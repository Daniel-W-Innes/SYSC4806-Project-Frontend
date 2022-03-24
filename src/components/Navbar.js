import React from "react";
import {Nav, NavScrollLink, Bars, NavMenu, NavSignUpBtnLink, Logo} from "./NavbarElements.js";
import {useNavigate} from 'react-router-dom';
import LOGO from "../images/survey_logo.png";

function Navbar(props) {

    const history = useNavigate();

    const logOutUserHandler = (event) => {
        event.preventDefault();
        props.setSurveyor("", "");
        localStorage.clear();
        history("/");
    }

    return (
        <Nav>
            <NavScrollLink to="/">
                <Logo src={LOGO} alt="" style={{padding:"6%"}}/>
            </NavScrollLink>
            <Bars />
            <NavMenu>
                <NavScrollLink to="/">
                    HOME
                </NavScrollLink>
                {props.isLoggedIn && <NavScrollLink to="/survey-list">SURVEYS LIST</NavScrollLink>}
                {!props.isLoggedIn && <NavScrollLink to="/">SURVEYS LIST</NavScrollLink>}
                {props.isLoggedIn && <NavScrollLink to="/create-survey">CREATE SURVEY</NavScrollLink>}
                {!props.isLoggedIn && <NavScrollLink to="/">CREATE SURVEY</NavScrollLink>}
                <NavScrollLink to="/">
                    ABOUT
                </NavScrollLink>
                {props.isLoggedIn && <NavScrollLink to="/">HELLO, {(props.username).toUpperCase()}</NavScrollLink>}
                {props.isLoggedIn && <NavSignUpBtnLink to="/" onClick={logOutUserHandler}>LOG OUT</NavSignUpBtnLink>}
                {!props.isLoggedIn && <NavScrollLink to="/signin">SIGN IN</NavScrollLink>}
                {!props.isLoggedIn && <NavSignUpBtnLink to="/signup">SIGN UP</NavSignUpBtnLink>}
            </NavMenu>
        </Nav>
    );
}

export default Navbar;