import styled from "styled-components";
import {NavLink as Link} from "react-router-dom";

export const SignUpContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 25%;
    height: 70%;
    transform: translate(-50%, -50%);
    border-radius: 30px;
    background: #000A;
    align-items: center;
    text-align: center;
    padding: 2.5%;
`

export const SignUpText = styled.h1`
    padding-bottom: 3.5%;
    color: #fff;
    font-weight: 500;
`

export const InputDiv = styled.div`
    position: relative; 
    width: 100%;
`

export const SignUpInput = styled.input`
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

export const SignUpBtn = styled.button`
    margin-top: 5px;
    margin-bottom: 25px;
    padding: 12px 50px;
    width: 100%;
    display: inline-block;
    font-size: 18px;
    border-radius: 4px;
    background: #7A63FF;
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

export const SignInStatement = styled.p`
    color: #fff;
`

export const SignInToggle = styled(Link)`
    padding-left: 2%;
    color: #7A63FF;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        color: #3DED97;
    }
`

export const ErrorContainer = styled.div`
    padding-top: 2%;
    height: 100%;
    width: 100%;
    text-align: center;
    padding-bottom: 2%;
`
export const Error = styled.p`
    color: red;
    font-size: 12px;
`