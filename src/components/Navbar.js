import React from "react";
import {Nav, NavScrollLink, Bars, NavMenu, NavSignUpBtnLink, Logo, SearchInput} from "./NavbarElements.js";
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
    //create event which uses a text input feild to redirect to answer-survey page using the id as link parameter
    const answerSurveyHandler = (event) => {
        event.preventDefault();
        //only allow interger input
        if (event.target.value.match(/^\d+$/)) {
            history(`/answer-survey?surveyID=${event.target.value}`);
            console.log(`/answer-survey?surveyID=${event.target.value}`);
    }
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
                {props.isLoggedIn && <NavScrollLink to="/create-survey">CREATE SURVEY</NavScrollLink>}
                <NavScrollLink to="/">
                    ABOUT
                </NavScrollLink>
                {props.isLoggedIn && <NavScrollLink to="/">HELLO, {(props.username).toUpperCase()}</NavScrollLink>}
                {props.isLoggedIn && <NavSignUpBtnLink to="/" onClick={logOutUserHandler}>LOG OUT</NavSignUpBtnLink>}
                {!props.isLoggedIn && <NavScrollLink to="/signin">SIGN IN</NavScrollLink>}
                {!props.isLoggedIn && <NavSignUpBtnLink to="/signup">SIGN UP</NavSignUpBtnLink>}
                {!props.isLoggedIn &&<SearchInput type="text" placeholder="Survey ID" onKeyDown={e => e.key === 'Enter' && answerSurveyHandler(e)}/>}
            </NavMenu>
        </Nav>
    );
}

export default Navbar;