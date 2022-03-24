import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { MainDiv, SurveyContainer, TitleContainer, SurveyTitleText, Question, SubmitBtn, BtnContainer, MultipleChoiceOption, TextInput } from "./AnswerSurveyElements";

// TODO: submit answers to database
function AnswerSurvey() {

    let [searchParams, setSearchParams] = useSearchParams();
    let [surveyName, setSurveyName] = useState( searchParams.get("name") );
    const [questionList, setQuestionsList] = useState([]);
    const [mcQuestions, setMCQuestions] = useState( {} );
    const [msQuestions, setMSQuestions] = useState( {} );
    const [textQuestions, setTextQuestions] = useState( {} );
    const [rateQuestions, setRateQuestions] = useState( {} );

    useEffect(() => {
        axios.get('https://sysc4806-survey-monkey.herokuapp.com/api/v0/surveyors/DEFAULT/survey?name='.concat(surveyName))
        //axios.get('http://localhost:8080/api/v0/surveyors/DEFAULT/survey?name='.concat(surveyName)) // For testing
        .then(response => {
            console.log(response.data);
            setQuestionsList(response.data["questions"]);
        })
    }, []);

    const handleOnMCChange = (question, choicePosition) => {
        var qId = question["id"];
        var newMCQuestions = mcQuestions;
        if(!(qId in newMCQuestions)) newMCQuestions[qId] = new Array(question["options"].length).fill(false);
        setMCQuestions(newMCQuestions);

        const updatedChecked = mcQuestions[qId].map((item, index) =>
            index === choicePosition ? item = true : item = false
        );

        var newMCQuestions = mcQuestions;
        newMCQuestions[qId] = updatedChecked;
        setMCQuestions(newMCQuestions);
        console.log(mcQuestions);
    };

    const multipleChoiceQuestion = (question) => {
        return(<div>
            {question["options"].map((name, i) => 
                <MultipleChoiceOption className={question["question"]} key={i}>
                    <label>
                        <input
                            type="radio"
                            name={question["question"]}
                            value={name}
                            onChange={(e) => handleOnMCChange(question, i, e)}
                        />
                        &nbsp;{name}
                    </label> <br />
                </MultipleChoiceOption>)
            }
        </div>);
    }

    const handleOnMSChange = (question, choicePosition) => {
        var qId = question["id"];
        var newMSQuestions = msQuestions;
        if(!(qId in newMSQuestions)) newMSQuestions[qId] = new Array(question["options"].length).fill(false);
        setMSQuestions(newMSQuestions);


        const updatedChecked = msQuestions[qId].map((item, index) =>
            index === choicePosition ? !item : item
        );

        var newMSQuestions = msQuestions;
        newMSQuestions[qId] = updatedChecked;
        setMSQuestions(newMSQuestions);
        console.log(msQuestions);
    };

    const multipleSelectQuestion = (question) => {
        return(<div>
            {question["options"].map((item, i) => 
                <MultipleChoiceOption className="checkbox" key={i}>
                    <label>
                        <input
                            type="checkbox"
                            value={question["question"]}
                            onChange={() => handleOnMSChange(question, i)}
                        />
                        &nbsp;{item}
                    </label> <br />
                </MultipleChoiceOption>)
            }
        </div>);
    }

    const handleOnTextChange = (question, e) => {
        var qId = question["id"];
        var newTextQuestions = textQuestions;
        newTextQuestions[qId] = e.target.value;
        setTextQuestions(newTextQuestions);
        console.log(textQuestions);
    };

    const longAnswerQuestion = (question) => {
        return(<div>
            <TextInput 
                name={question["question"]} 
                type="text" 
                value={textQuestions[question["id"]]} 
                onChange={(e) => handleOnTextChange(question, e)} 
            />
        </div>);
    }

    const handleOnRateChange = (question, e) => {
        var qId = question["id"];
        var newRateQuestions = rateQuestions;
        newRateQuestions[qId] = e.target.value;
        setRateQuestions(newRateQuestions);
        console.log(rateQuestions);
    };

    const rateQuestion = (question) => {
        return(<div>
            <input
                type="number"
                name={question["question"]}
                min={question["min"]}
                max={question["max"]}
                onChange={(e) => handleOnRateChange(question, e)}
            />
        </div>);
    }

    return (
        <MainDiv>
            <TitleContainer>
                <SurveyTitleText>Survey Title</SurveyTitleText>
            </TitleContainer>
           
            <form>
                {questionList.map((question, i) => 
                <SurveyContainer key={i}> 
                    <Question>Q{i+1} &nbsp; {question["question"]}</Question><br /> <br />
                    {("options" in question && question["type"] == "SINGLE_SELECTION") ? multipleChoiceQuestion(question) : ""}
                    {("options" in question && question["type"] == "MULTI_SELECTION") ? multipleSelectQuestion(question) : ""}
                    {"max" in question ? rateQuestion(question) : ""}
                    { !("options" in question) && !("max" in question) ? longAnswerQuestion(question) : ""}
                </SurveyContainer>)
                }
                <BtnContainer><SubmitBtn type="submit" value="SUBMIT SURVEY" /></BtnContainer>
            </form>
        </MainDiv>
    );
}

export default AnswerSurvey;