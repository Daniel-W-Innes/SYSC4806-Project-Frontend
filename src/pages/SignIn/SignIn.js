import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {SignInContainer, SignInInput, SignInText, InputDiv, SignUpStatement, SignInBtn, SignUpToggle, ErrorContainer, Error, ForgotPassword} from "./SignInElements.js";
import {BackgroundImg, Line} from "../Home/HomeElements.js";
import img from "../../images/green_gradient_2.png";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

function SignIn(props) {

    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showError, setShowError] = useState(false);
    const history = useNavigate();

    const usernameHandler = (event) => {
        setEnteredUsername(event.target.value);
    }

    const passwordHandler = (event) => {
        setEnteredPassword(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const signInSurveyor = {
            username: enteredUsername,
            password: enteredPassword
        }
        axios.post('https://sysc4806-survey-monkey.herokuapp.com/api/v0/login', signInSurveyor)
        //axios.post('http://localhost:8080/api/v0/login', signInSurveyor)
            .then((res) => {
                props.setLoggedInSurveyor(res.data.access_token, res.data.username);
                localStorage.setItem("access_token", res.data.access_token);
                localStorage.setItem("refresh_token", res.data.refresh_token);
                localStorage.setItem("username", res.data.username);
                setEnteredUsername("");
                setEnteredPassword("");
                history("/");
            }).catch(err => {
                const msg = err.response.data.error;
                if (msg.localeCompare("The username or password you entered is incorrect") === 0) {
                    setErrorMsg(msg);
                    setShowError(true);
                }
                setEnteredUsername("");
                setEnteredPassword("");
            });
    }

    return (
        <BackgroundImg img={img} >
            <SignInContainer>
                <SignInText>SIGN IN</SignInText>
                <Line width={"100%"}/>
                <form onSubmit={submitHandler}>
                    <InputDiv>
                        <SignInInput type="text" placeholder="Username" value={enteredUsername} onChange={usernameHandler} />
                        <PersonOutlineIcon style={{position: "absolute", top: "7px", left: "5px"}} />
                    </InputDiv>
                    <InputDiv>
                        <SignInInput type="password" placeholder="Password" value={enteredPassword} onChange={passwordHandler} />
                        <LockOutlinedIcon style={{position: "absolute", top: "7px", left: "5px"}} />
                    </InputDiv>
                    <ErrorContainer>
                        {showError && <Error>{errorMsg}</Error>}
                        <ForgotPassword>Forgot Password?</ForgotPassword> 
                    </ErrorContainer>
                    <SignInBtn>LOGIN</SignInBtn>
                    <SignUpStatement>Don't have an account?<SignUpToggle to="/signup">Sign Up</SignUpToggle></SignUpStatement>
                </form>
            </SignInContainer>
        </BackgroundImg>
    );
}

export default SignIn;