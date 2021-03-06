import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'
import {MainDiv, SurveyListText, UpdateButton, SurveyBtnLink} from "./SurveyListElements";
import axios from 'axios';

function SurveyList(props) {

    const [surveyList, setSurveyList] = useState([]);

    useEffect(() => {
        if (props.isLoggedIn) {
            axios.get(('https://sysc4806-survey-monkey.herokuapp.com/api/v0/surveyors/' + props.username + '/surveys'), {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem("access_token")
                }
            }).then(response => {
                console.log(response.data);
                setSurveyList(response.data);
            });
        }
    }, [props.username, props.isLoggedIn]);

    // useEffect(() => {
    //     if (props.isLoggedIn) {
    //         axios.get('http://localhost:8080/api/v0/surveyors/DEFAULT/surveys')
    //         .then(response => {
    //             console.log(response.data);
    //             setSurveyList(response.data);
    //         });
    //     }
    // }, [props.username, props.isLoggedIn]);

    const refreshSurveyList = (event) => {
        if (props.isLoggedIn) {
            axios.get(('https://sysc4806-survey-monkey.herokuapp.com/api/v0/surveyors/' + props.username + '/surveys'), {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem("access_token")
                }
            }).then(response => {
                console.log(response.data);
                setSurveyList(response.data);
            });
        }
    }

    // const refreshSurveyList = (event) => {
    //     if (props.isLoggedIn) {
    //         axios.get('http://localhost:8080/api/v0/surveyors/DEFAULT/surveys')
    //         .then(response => {
    //             console.log(response.data);
    //             setSurveyList(response.data);
    //         });
    //     }
    // }

    return (
        <MainDiv>
            <SurveyListText>SURVEYOR NAME: {(props.username).toUpperCase()}<br/>LIST OF SURVEYS</SurveyListText>
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>SurveyId</th>
                        <th>SurveyName</th>
                        <th>SurveyResults</th>
                    </tr>
                </thead>
                <tbody>
                    {surveyList.map((item, i) => 
                    <tr key={i}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{<SurveyBtnLink to={"/display-response?surveyID=" + item.id}>CHECK RESULTS</SurveyBtnLink>}</td>
                    </tr>)}
                </tbody>
                </Table>
            <UpdateButton onClick={refreshSurveyList}>UPDATE</UpdateButton>
        </MainDiv>
    );
}

export default SurveyList;