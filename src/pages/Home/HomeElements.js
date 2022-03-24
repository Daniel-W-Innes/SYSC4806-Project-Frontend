import styled from "styled-components";
import {HashLink} from "react-router-hash-link";

export const BackgroundImg = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${props => props.img});
    background-size: cover;
`

export const TextContainer = styled.div`
    padding: 12%;
    text-align: center;
`
export const BlackBox = styled.div`
    height: 100%;
    width: 75%;
    background-color: #000A;
    text-align: center;
    margin: 6% auto;
`
export const Greeting = styled.h1`
    padding-top: 1%;
    padding-bottom: 0.5%;
    color: #ffffff; 
    font-size: 62px; 
    font-weight: 700; 
    line-height: 72px; 
    text-align: center; 
    text-shadow: #000 0px 0px 2.5px,   #000 0px 0px 2.5px,   #000 0px 0px 2.5px,
    #000 0px 0px 2.5px,   #000 0px 0px 2.5px,   #000 0px 0px 2.5px;
`

export const Line = styled.hr`
    background-color: #7A63FF;
    margin: auto; 
    width: ${(props) => props.width};
    height: 5px;
    border: 0.1px solid black;
`

export const Intro = styled.h3`
    padding-top: 1.5%;
    padding-bottom: 1.5%;
    color: #ffffff; 
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    text-shadow: #000 0px 0px 2.5px,   #000 0px 0px 2.5px,   #000 0px 0px 2.5px,
    #000 0px 0px 2.5px,   #000 0px 0px 2.5px,   #000 0px 0px 2.5px;
`

export const SignUpBtnLink = styled(HashLink)`
    border-radius: 4px;
    background: #7A63FF;
    padding: 10px 22px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #3DED97;
        color: #fff;
    }
`