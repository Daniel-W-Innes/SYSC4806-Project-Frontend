import React from "react";
import {MainDiv, SurveyContainer, SurveyTitleText, SurveyFormLabel, Span, TextInput, QuestionTypeSelect, QuestionType, AddQuestionBtn} from "./CreateSurveyElements.js";
// import axios from 'axios';

function CreateSurvey() {
    return (
        <MainDiv>
            <SurveyContainer>
                <SurveyFormLabel for="surveyTitle">SURVEY TITLE</SurveyFormLabel>
                <TextInput name="surveyTitle" type="text"/>
            </SurveyContainer>

            <SurveyContainer>
                <SurveyFormLabel for="surveyQuestion">QUESTION</SurveyFormLabel>
                <TextInput name="surveyQuestion" type="text"/>
                <QuestionTypeSelect>
                    <QuestionType>Multiple Choice</QuestionType>
                    <QuestionType>Multi-Select</QuestionType>
                    <QuestionType>Rating</QuestionType>
                    <QuestionType>Long Answer</QuestionType>
                </QuestionTypeSelect>
                <AddQuestionBtn>ADD QUESTION</AddQuestionBtn>
            </SurveyContainer>
        </MainDiv>
    );
}

export default CreateSurvey;