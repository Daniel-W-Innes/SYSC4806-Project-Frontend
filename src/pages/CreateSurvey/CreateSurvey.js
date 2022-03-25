import React, {useState} from "react";
import {MainDiv, SurveyContainer, SurveyFormLabel, TextInput, QuestionTypeSelect, QuestionType, AddQuestionBtn, SurveyRow} from "./CreateSurveyElements.js";
import axios from 'axios';

function CreateSurvey(props) {
        const [counter, setCounter] = useState(0);
        const [questionList, setInputList] = useState([]);
        const createElement = (event) => {
            setCounter(counter + 1);
            console.log(counter);
            var surveyQuestion = document.getElementById("surveyQuestion").value;
            var questionType = document.getElementById("mult_type").value;
            
            console.log(questionType);
            if (questionType === "Multiple Choice"){
                setInputList(questionList.concat(
                    <SurveyContainer>    
                        <SurveyFormLabel id = "questionType"  htmlfor="surveyQuestion">{questionType}</SurveyFormLabel>
                        <SurveyRow>
                            <SurveyFormLabel htmlfor="surveyQuestion">QUESTION</SurveyFormLabel>
                            <TextInput id = "question" name="surveyQuestion" type="text" defaultValue={surveyQuestion}/>
                        </SurveyRow>

                        <SurveyRow>
                            <SurveyFormLabel htmlfor="surveyQuestion">NUMBER OF OPTIONS</SurveyFormLabel>
                            <TextInput onChange={(e) => multiSize(e)} type="number" id= {counter} name="quantity" min="2" max="10"/>
                        </SurveyRow>
                        <SurveyRow id={"MC" + counter}>
                        </SurveyRow>
                    </SurveyContainer>));
            }
            else if (questionType === "Long Answer"){
                setInputList(questionList.concat(
                    <SurveyContainer> 
                        <SurveyFormLabel id = "questionType" htmlfor="surveyQuestion">{questionType}</SurveyFormLabel>
                        <SurveyFormLabel htmlfor="surveyQuestion">QUESTION</SurveyFormLabel>
                        <TextInput id = "question" name="surveyQuestion" class="Long_M2" type="text" defaultValue={surveyQuestion}/><br></br>
                    </SurveyContainer>));
            }else if (questionType === "Multi-Select"){
                setInputList(questionList.concat(
                    <SurveyContainer>    
                        <SurveyFormLabel id = "questionType" htmlfor="surveyQuestion">{questionType}</SurveyFormLabel>
                        <SurveyRow>
                            <SurveyFormLabel htmlfor="surveyQuestion">QUESTION</SurveyFormLabel>
                            <TextInput id = "question" name="surveyQuestion" type="text" defaultValue={surveyQuestion}/>
                        </SurveyRow>
                        
                        <SurveyRow>
                            <SurveyFormLabel htmlfor="surveyQuestion">NUMBER OF OPTIONS</SurveyFormLabel>
                            <TextInput onChange={multiSize} type="number" id={counter} name="quantity" min="2" max="10"/>
                        </SurveyRow>
                        <SurveyRow id={"MC" + counter}>
                        </SurveyRow>
                        
                    </SurveyContainer>));
            }else if (questionType === "Rating"){
                setInputList(questionList.concat(
                    <SurveyContainer> 
                        <SurveyFormLabel id = "questionType" htmlfor="surveyQuestion">{questionType}</SurveyFormLabel>
                        <SurveyFormLabel htmlfor="surveyQuestion">QUESTION</SurveyFormLabel>
                        <TextInput id = "question" name="surveyQuestion" type="text" defaultValue={surveyQuestion}/><br></br>
                        <SurveyContainer>
                            <SurveyFormLabel htmlfor="surveyQuestion">Min Value:</SurveyFormLabel>
                            <TextInput onChange={minMax} type="number" id="min" name="quantity" min="0" max="9999"/><br></br>
                        </SurveyContainer>
                        <SurveyContainer>
                        <SurveyFormLabel htmlfor="surveyQuestion">Max Value:</SurveyFormLabel>
                        <TextInput onChange={minMax} type="number" id="max" name="quantity" min="0" max="9999"/>
                        </SurveyContainer>
                    </SurveyContainer>));
            };
            
        };

        const minMax = (event) => {
            var min = document.getElementById("min").value;
            var max = document.getElementById("max").value;
            if(min > max){
                min = max;
            }
            document.getElementById("min").value = min;
        };

        const multiSize = (event) => {
            var options = document.getElementById(event.target.id).value;
            document.getElementById("MC" + event.target.id).innerHTML = "";
            var inner = "";
            
            for (let i = 0; i < options; i++) {
                inner = inner + "<div class='sc-eCImPb jYpmpS'><label htmlfor='surveyQuestion' class='sc-gKclnd eyuFde'>Option"+ (i+1) +":</label><input id = 'option' name='surveyAnswer' type='text' class='sc-furwcr dyUsvD' value=''></div>";
            }

            document.getElementById("MC" + event.target.id).innerHTML = inner;
        }

        const submitSurvey = (event) => {
            var questions = [];
            var newSurvey = {
                "name": document.getElementById("SURVEY_TITLE").value,
                "questions": questions
            };
            var long_ans = document.getElementsByClassName("sc-pVTFL fhmRc");
            console.log(long_ans);
            for(var i = 1 ; i < long_ans.length-1; i++){    
                var question = long_ans[i];
                console.log(question.value);
                /*
                if(question.getElementById("questionType").innerHTML === "Multiple Choice"){
                    options = [];
                    for (let i = 0; i < document.getElementById(i).value; i++){
                        options = document.getElementById("MC" + i).getElementsById("option").innerHTML;
                    }

                    newSurvey.questions.push({ 
                        "type" : question.getElementById("questionType").innerHTML,
                        "question" : question.getElementById("question").value,
                        "displayFormat" : "MULTIPLE_CHOICE",
                        "options": options 
                    });

                } else if(question.getElementById("questionType").innerHTML === "Multi-Select"){
                    options = []
                    for (let i = 0; i < document.getElementById(i).value; i++){
                        options = document.getElementById("MC" + i).getElementsById("option").innerHTML;
                    }

                    newSurvey.questions.push({ 
                        "type" : question.getElementById("questionType").innerHTML,
                        "question" : question.getElementById("question").value,
                        "displayFormat" : "MULTI-SELECT",
                        "options": options 
                    });
                } else if(question.getElementById("questionType").innerHTML === "Rating"){
                    
                    newSurvey.questions.push({ 
                        "type" : question.getElementById("questionType").innerHTML,
                        "question" : question.getElementById("question").value,
                        "displayFormat" : "RATING",
                        "min" : question.getElementById("min").value,
                        "max" : question.getElementById("max").value
                    });
                }*/
                 
                newSurvey.questions.push({
                    "type" : "text",
                    "question" : question.value
                });
                
            }

            console.log(JSON.stringify(newSurvey));

            var config = {
                method: 'post',
                url: "https://sysc4806-survey-monkey.herokuapp.com/answer-survey?surveyor="+ props.username +"&name=%20survey",
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : JSON.stringify(newSurvey)
            };
            
            axios(config)
            .then(response => {
                console.log(response.data);
                alert("Your answers were submitted successfully.");
            })
            
        };

    return (
        <MainDiv>
            <SurveyContainer>
                <SurveyFormLabel htmlfor="surveyTitle">SURVEY TITLE</SurveyFormLabel>
                <TextInput id="SURVEY_TITLE" name="surveyTitle" type="text"/>
            </SurveyContainer>
            {questionList}
            <SurveyContainer>
                <SurveyFormLabel htmlfor="surveyQuestion">QUESTION</SurveyFormLabel>
                <TextInput id="surveyQuestion" name="surveyQuestion" type="text"/>
                <QuestionTypeSelect id="mult_type">
                    <QuestionType>Multiple Choice</QuestionType>
                    <QuestionType>Multi-Select</QuestionType>
                    <QuestionType>Rating</QuestionType>
                    <QuestionType>Long Answer</QuestionType>
                </QuestionTypeSelect>
                <AddQuestionBtn onClick={createElement}>ADD QUESTION</AddQuestionBtn>
            </SurveyContainer>
            <SurveyContainer>
                <AddQuestionBtn onClick={submitSurvey}>SUBMIT SURVEY</AddQuestionBtn>
            </SurveyContainer>
        </MainDiv>
    );
}

export default CreateSurvey;

// axios.get(('https://sysc4806-survey-monkey.herokuapp.com/api/v0/surveyors/' + props.username + '/surveys'), {
// headers: {
//     'Authorization': "Bearer " + localStorage.getItem("access_token")
// }
// }).then(response => {
//     console.log(response.data);
//     setSurveyList(response.data);
// });



