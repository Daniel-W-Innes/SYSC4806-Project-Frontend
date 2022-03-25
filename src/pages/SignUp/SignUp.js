import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {SignUpContainer, SignUpText, SignUpInput, SignUpBtn, InputDiv, SignInStatement, SignInToggle, Error, ErrorContainer} from "./SignUpElements";
import {BackgroundImg, Line} from "../Home/HomeElements.js";
import img from "../../images/green_gradient_2.png";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

function SignUp() {

    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredFirstName, setEnteredFirstName] = useState("");
    const [enteredLastName, setEnteredLastName] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enteredConfirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showError, setShowError] = useState(false);
    const history = useNavigate();

    const usernameHandler = (event) => {
        setEnteredUsername(event.target.value);
    }

    const firstNameHandler = (event) => {
        setEnteredFirstName(event.target.value);
    }

    const lastNameHandler = (event) => {
        setEnteredLastName(event.target.value);
    }

    const passwordHandler = (event) => {
        setEnteredPassword(event.target.value);
    }

    const confirmPasswordHandler = (event) => {
        setConfirmPassword(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (enteredPassword.localeCompare(enteredConfirmPassword) === 0) {
            const signUpUser = {
                username: enteredUsername,
                firstName: enteredFirstName,
                lastName: enteredLastName,
                hashedPassword: enteredPassword
            }
            axios.post('https://sysc4806-survey-monkey.herokuapp.com/api/v0/surveyors/api/v0/surveyors', signUpUser)
                .then(() => {
                    setShowError(false);
                    setEnteredUsername("");
                    setEnteredFirstName("");
                    setEnteredLastName("");
                    setEnteredPassword("");
                    setConfirmPassword("");
                    history("/signin");
                }).catch(err => {
                    const msg = err.response.data;
                    if (msg.localeCompare("surveyor already exists") === 0) {
                        setErrorMsg(msg);
                        setShowError(true);
                    }
                    console.log(err)
                    setEnteredUsername("");
                    setEnteredFirstName("");
                    setEnteredLastName("");
                    setEnteredPassword("");
                    setConfirmPassword("");
                });
        } else {
            setErrorMsg("Passwords do not match. Try Again.");
            setEnteredPassword("");
            setConfirmPassword("");
            setShowError(true);
        }
    }

    return (
        <BackgroundImg img={img} >
            <SignUpContainer>
                <SignUpText>SIGN UP</SignUpText>
                <Line width={"100%"}/>
                <form onSubmit={submitHandler}>
                    <InputDiv>
                        <SignUpInput type="text" placeholder="Username" value={enteredUsername} onChange={usernameHandler} />
                        <PersonOutlineIcon style={{position: "absolute", top: "7px", left: "5px"}} />
                    </InputDiv>
                    <InputDiv>
                        <SignUpInput type="text" placeholder="First Name" value={enteredFirstName} onChange={firstNameHandler} />
                        <MailOutlineIcon style={{position: "absolute", top: "7px", left: "5px"}} />
                    </InputDiv>
                    <InputDiv>
                        <SignUpInput type="text" placeholder="Last Name" value={enteredLastName} onChange={lastNameHandler} />
                        <MailOutlineIcon style={{position: "absolute", top: "7px", left: "5px"}} />
                    </InputDiv>
                    <InputDiv>
                        <SignUpInput type="password" placeholder="Password" value={enteredPassword} onChange={passwordHandler} />
                        <LockOutlinedIcon style={{position: "absolute", top: "7px", left: "5px"}} />
                    </InputDiv>
                    <InputDiv>
                        <SignUpInput type="password" placeholder="Confirm Password" value={enteredConfirmPassword} onChange={confirmPasswordHandler} />
                        <LockOutlinedIcon style={{position: "absolute", top: "7px", left: "5px"}} />
                    </InputDiv>
                    <ErrorContainer>
                        {showError && <Error>{errorMsg}</Error>}
                    </ErrorContainer>
                    <SignUpBtn type="submit">REGISTER</SignUpBtn>
                    <SignInStatement>Already have an account?<SignInToggle to="/signin">Sign In</SignInToggle></SignInStatement>
                </form>
            </SignUpContainer>
        </BackgroundImg>
    );
}

export default SignUp;