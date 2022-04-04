import styled from "styled-components";
import {HashLink} from "react-router-hash-link";
import {FaBars} from "react-icons/fa"

export const Nav = styled.nav`
    background: #000A;
    height: 110px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem calc((80vw - 1000px) / 2);
    position: absolute;
    width: 100%;
`

export const Logo = styled.img`
    height: 110px;
    width: 100px;
    padding: 2% 2% 2%;
`

export const NavScrollLink = styled(HashLink)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &:hover {
        transition: all 0.2s ease-in-out;
        color: #7A63FF;
    }
`

export const Bars = styled(FaBars)`
    display: none;

    @media screen and (max-width: 768px) {
        display: block;
        transform: translate(-100%, 60%);
        font-size: 2.5rem;
        cursor: pointer;
        color: #fff;
    }
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavSignUpBtnLink = styled(HashLink)`
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

export const SearchInput = styled.input`
    display: block;
    box-sizing: border-box;
	border: none;
	padding: 12px 15px;
    padding-left: 37.5px;
    margin-bottom: 30px; ;
	margin-top: 30px;
    margin-left: auto;
	width: 30%;
    font-size: 0.8rem;
    background: #a5e6d2;
    &:focus {
        outline: 2px solid #7A63FF;
    }
`