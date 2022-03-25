import styled from "styled-components";
import {NavLink as Link} from "react-router-dom";

export const SignInContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 26%;
    height: 50%;
    transform: translate(-50%, -50%);
    border-radius: 30px;
    background: #000A;
    align-items: center;
    text-align: center;
    padding: 2.5%;
`
export const SignInText = styled.h1`
    padding-bottom: 3.5%;
    color: #fff;
    font-weight: 500;
`

export const InputDiv = styled.div`
    position: relative; 
    width: 100%;
`

export const SignInInput = styled.input`
    display: block;
    box-sizing: border-box;
	border: none;
	padding: 12px 15px;
    padding-left: 37.5px;
	margin-top: 30px;
	width: 100%;
    font-size: 0.8rem;
    
    &:focus {
        outline: 2px solid #7A63FF;
    }
`

export const SignInBtn = styled.button`
    width: 100%;
    margin: 25px 0;
    font-size: 18px;
    border-radius: 4px;
    background: #7A63FF;
    padding: 12px 50px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #3DED97;
    }
`

export const SignUpStatement = styled.p`
    color: #fff;
`
export const SignUpToggle = styled(Link)`
    padding-left: 2%;
    color: #7A63FF;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        color: #3DED97;
    }
`

export const ForgotPassword = styled.a`
    font-size: 13px;
    float: right;
    color: #fff;
    cursor: pointer;

    &:hover {
        color: #7A63FF;
    }
`

export const ErrorContainer = styled.div`
    width: 100%;
    text-align: center;
    padding-top: 2.5%;
`

export const Error = styled.p`
    color: red;
    font-size: 12px;
    padding-bottom: 2%;
`