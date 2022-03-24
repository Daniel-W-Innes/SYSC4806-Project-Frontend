import React from 'react';
import {BackgroundImg, TextContainer, BlackBox, Greeting, Line, Intro, SignUpBtnLink} from "./HomeElements";
import img from "../../images/green_gradient_2.png";

function Home(props) {
    return (
    <div>
        <BackgroundImg img={img}>
                <TextContainer>
                    <BlackBox>
                        <Greeting>WELCOME TO GROUP 20'S <br/> MINI-SURVEY-MONKEY!</Greeting>
                        <Line width={"65%"}/>
                        <Intro>Ready to create a survey?</Intro>
                        <div style={{paddingBottom: "3%", paddingTop: "1.3%"}}>
                            {props.isLoggedIn && <SignUpBtnLink to="/create-survey">CREATE SURVEY</SignUpBtnLink>}
                            {!props.isLoggedIn && <SignUpBtnLink to="/signin">SIGN IN</SignUpBtnLink>}
                        </div>
                    </BlackBox>
                </TextContainer>
        </BackgroundImg>
    </div>
    );
}

export default Home;