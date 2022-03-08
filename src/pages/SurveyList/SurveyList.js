import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'
import {MainDiv, SurveyListText, UpdateButton} from "./SurveyListElements";
import axios from 'axios';

function SurveyList() {

    const [surveyList, setSurveyList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v0/surveyors/DEFAULT/surveys')
        .then(response => {
            console.log(response.data);
            setSurveyList(response.data);
        });
    }, []);

    const refreshSurveyList = (event) => {
        axios.get('http://localhost:8080/api/v0/surveyors/DEFAULT/surveys')
            .then(response => {
                console.log(response.data);
                setSurveyList(response.data);
            })
    }

    return (
        <MainDiv>
            <SurveyListText>SURVEYOR NAME: DEFAULT <br/>LIST OF SURVEYS</SurveyListText>
            <Table striped variant="dark">
            <thead>
                <tr>
                    <th>SurveyId</th>
                    <th>SurveyName</th>
                </tr>
            </thead>
            <tbody>
                {surveyList.map((item, i) => 
                <tr key={i}>
                    <td>{item.surveyId}</td>
                    <td>{item.name}</td>
                </tr>)}
            </tbody>
            </Table>
            <UpdateButton onClick={refreshSurveyList}>UPDATE</UpdateButton>
        </MainDiv>
    );
}

export default SurveyList;