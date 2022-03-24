import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { MainDiv, SurveyContainer, TitleContainer, SurveyTitleText, Question, SubmitBtn, BtnContainer, MultipleChoiceOption, TextInput } from "./AnswerSurveyElements";

function AnswerSurvey() {

    let [searchParams, setSearchParams] = useSearchParams();
    let [surveyName, setSurveyName] = useState( searchParams.get("name") );
    const [questionList, setQuestionsList] = useState([]);
    const [answerList, setAnswerList] = useState([]);

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
        var newAnswers = answerList;
        newAnswers[qId] = question["options"][choicePosition];
        setAnswerList(newAnswers);
        console.log(answerList);
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
                            onChange={() => handleOnMCChange(question, i)}
                        />
                        &nbsp;{name}
                    </label> <br />
                </MultipleChoiceOption>)
            }
        </div>);
    }

    const handleOnMSChange = (question, choicePosition) => {
        var qId = question["id"];
        var newAnswers = answerList;
        if(!(qId in newAnswers)) newAnswers[qId] = new Array(question["options"].length).fill(false);

        const updatedChecked = answerList[qId].map((item, index) =>
            index === choicePosition ? !item : item
        );

        newAnswers[qId] = updatedChecked;
        setAnswerList(newAnswers);
        console.log(answerList);
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

    const handleOnTextChange = (question, e, type) => { // Used for text and number questions
        var qId = question["id"];
        var newAnswers = answerList;
        newAnswers[qId] = (type === "number" ? parseInt(e.target.value) : e.target.value);
        setAnswerList(newAnswers);
        console.log(answerList);
    };

    const longAnswerQuestion = (question) => {
        return(<div>
            <TextInput 
                name={question["question"]} 
                type="text" 
                value={answerList[question["id"]]} 
                onChange={(e) => handleOnTextChange(question, e, "text")} 
            />
        </div>);
    }

    const numberQuestion = (question) => {
        return(<div>
            <input
                type="number"
                name={question["question"]}
                min={question["min"]}
                max={question["max"]}
                onChange={(e) => handleOnTextChange(question, e, "number")}
                onKeyDown={(e) => {e.preventDefault()}}
            />
        </div>);
    }

    const sendAnswerToDB = (answerObj) => {
        console.log(JSON.stringify(answerObj));
        var config = {
            method: 'post',
            url: 'https://sysc4806-survey-monkey.herokuapp.com/api/v0/respondents/answer',
            // url: 'http://localhost:8080/api/v0/respondents/answer', //For testing
            headers: { 
              'Content-Type': 'application/json'
            },
            data : JSON.stringify(answerObj)
        };
        
        axios(config)
        .then(response => {
            console.log(response.data);
            alert("Your answers were submitted successfully.");
        }) // Redirect the user to another page?
    }

    const handleSubmit = ((e) => {
        e.preventDefault();

        // format each answer object + send them to the back end DB
        // unanswered questions will not have any associated anwer object
        questionList.forEach((question) => {
            if(question["id"] in answerList) {
                var answer = {};
                var ansType = "";
                var qType = "";
                var isMsQuestion = false;

                if("options" in question && question["type"] == "SINGLE_SELECTION") { // MC question
                    ansType = "text";
                    qType = "multipleChoice";
                } else if("options" in question && question["type"] == "MULTI_SELECTION") { // MS question
                    ansType = "text";
                    qType = "multipleChoice";
                    isMsQuestion = true;
                } else if("max" in question) { // Number question
                    //sendAnswerToDB(answer);
                    ansType = "number";
                    qType = "number";
                } else { // Text questions
                    ansType = "text";
                    qType = "text";
                }

                answer["type"] = ansType;
                answer["question"] = { "type": qType, "id": question["id"] };
                if(isMsQuestion) { // Send each checked option as an answer
                    answerList[question["id"]].forEach((option, i) => {
                        if(option) {
                            answer["answer"] = question["options"][i];
                            sendAnswerToDB(answer);
                        }
                    });
                } else { // send the answer once
                    answer["answer"] = answerList[question["id"]];
                    sendAnswerToDB(answer);
                }
            }
        });
    });

    return (
        <MainDiv>
            <TitleContainer>
                <SurveyTitleText>{surveyName}</SurveyTitleText>
            </TitleContainer>
           
            <form onSubmit={(e) => handleSubmit(e)}>
                {questionList.map((question, i) => 
                <SurveyContainer key={i}> 
                    <Question>Q{i+1} &nbsp; {question["question"]}</Question><br /> <br />
                    {("options" in question && question["type"] == "SINGLE_SELECTION") ? multipleChoiceQuestion(question) : ""}
                    {("options" in question && question["type"] == "MULTI_SELECTION") ? multipleSelectQuestion(question) : ""}
                    {"max" in question ? numberQuestion(question) : ""}
                    { !("options" in question) && !("max" in question) ? longAnswerQuestion(question) : ""}
                </SurveyContainer>)
                }
                <BtnContainer><SubmitBtn type="submit" value="SUBMIT SURVEY" /></BtnContainer>
            </form>
        </MainDiv>
    );
}

export default AnswerSurvey;