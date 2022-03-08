import React, {useState} from "react";
import {MainDiv, SurveyContainer, SurveyFormLabel, TextInput, QuestionTypeSelect, QuestionType, AddQuestionBtn} from "./CreateSurveyElements.js";
// import axios from 'axios';

function CreateSurvey() {
        const [questionList, setInputList] = useState([]);
        const createElement = (event) => {
            var surveyQuestion = document.getElementById("surveyQuestion").value;
            var questionType = document.getElementById("questionType").value;
            if (questionType === "Multiple Choice"){
                setInputList(questionList.concat(
                    <SurveyContainer> 
                        <SurveyFormLabel for="surveyQuestion">{questionType}</SurveyFormLabel>
                        <SurveyFormLabel for="surveyQuestion">QUESTION</SurveyFormLabel>
                        <TextInput name="surveyQuestion" type="text" defaultValue={surveyQuestion}/>
                    </SurveyContainer>));
            }
            else if (questionType === "Long Answer"){
                setInputList(questionList.concat(
                    <SurveyContainer> 
                        <SurveyFormLabel for="surveyQuestion">{questionType}</SurveyFormLabel>
                        <SurveyFormLabel for="surveyQuestion">QUESTION</SurveyFormLabel>
                        <TextInput name="surveyQuestion" type="text" defaultValue={surveyQuestion}/>
                    </SurveyContainer>));
            };
            
        };
    return (
        <MainDiv>
            <SurveyContainer>
                <SurveyFormLabel for="surveyTitle">SURVEY TITLE</SurveyFormLabel>
                <TextInput name="surveyTitle" type="text"/>
            </SurveyContainer>
            {questionList}
            <SurveyContainer>
                <SurveyFormLabel for="surveyQuestion">QUESTION</SurveyFormLabel>
                <TextInput id="surveyQuestion" name="surveyQuestion" type="text"/>
                <QuestionTypeSelect id="questionType">
                    <QuestionType>Multiple Choice</QuestionType>
                    <QuestionType>Multi-Select</QuestionType>
                    <QuestionType>Rating</QuestionType>
                    <QuestionType>Long Answer</QuestionType>
                </QuestionTypeSelect>
                <AddQuestionBtn onClick={createElement}>ADD QUESTION</AddQuestionBtn>
            </SurveyContainer>
        </MainDiv>
    );
}

export default CreateSurvey;