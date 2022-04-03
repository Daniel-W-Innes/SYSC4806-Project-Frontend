import styled from "styled-components";
import {HashLink} from "react-router-hash-link";

export const MainDiv = styled.div`
    padding-top: 10%;
    background: #ffff;
    text-align: center;
    align-items: center;
`
export const SurveyListText = styled.h1`
    font-weight: 500;
`

export const UpdateButton = styled.button`
    margin-top: 30px;
    margin-bottom: 25px;
    padding: 12px 10px;
    width: 20%;
    font-size: 23px;
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
        color: #FFFF;
    }
`
export const SurveyBtnLink = styled(HashLink)`
    border-radius: 4px;
    background: #7A63FF;
    padding: 5px 10px;
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