import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { MainDiv, SurveyContainer, TitleContainer, SurveyTitleText, Question, SubmitBtn, BtnContainer, MultipleChoiceOption, TextInput } from "./AnswerSurveyElements";

function AnswerSurvey() {

    let [searchParams] = useSearchParams();
    const surveyID =  searchParams.get("surveyID");
    const [questionList, setQuestionsList] = useState([]);
    const [answerList, setAnswerList] = useState([]);
    const [surveyName, setName] = useState("");


    useEffect(() => {
        
        //preform axios get and if returns 404 then set question list to empty array and set name to NO SURVEY FOUND
        axios.get(('https://sysc4806-survey-monkey.herokuapp.com/api/v0/respondents/?id=' + surveyID))
        //axios.get(('http://localhost:8080/api/v0/respondents/?id=' + surveyID)) // For testing
        .then(response => {
            console.log("Response?: " + response.data);
            setQuestionsList(response.data["questions"]);
            setName(response.data["name"]);
            //set H1 elements to the surveyName
        })
        .catch(error => {
            console.log("Error: " + error);
            setQuestionsList([]);
            setName("NO SURVEY FOUND");
        });
            
        

    }, [surveyID]);

    const handleOnMCChange = (question, choicePosition) => {
        var qId = question["id"];
        var newAnswers = answerList;
        newAnswers[qId] = question["options"][choicePosition];
        setAnswerList(newAnswers);
        console.log(answerList);
    };

    const multipleChoiceQuestion = (question) => {
        console.log(question)
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
                        {console.log(name)}
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
    };

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
    };

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
    };

    const sendAnswerToDB = (answerObj,respondentID) => {
        console.log(JSON.stringify(answerObj));
        var config = {
            method: 'post',
            url: 'https://sysc4806-survey-monkey.herokuapp.com/api/v0/respondents/answer/'+respondentID,
            //url: 'http://localhost:8080/api/v0/respondents/answer/'+respondentID, //For testing
            headers: { 
              'Content-Type': 'application/json'
            },
            data : JSON.stringify(answerObj)
        };

        axios(config)
        .then(response => {
            console.log(response.data);
            //alert("Your answers were submitted successfully.");
        }) // Redirect the user to another page?
    };
    
    // Create a function which sends a POST request to the backend to create a respondent using the surveyID in the URL
    function createRespondent () {
        var config = {
            method: 'post',
            url: 'https://sysc4806-survey-monkey.herokuapp.com/api/v0/respondents/'+surveyID
            //url: 'http://localhost:8080/api/v0/respondents/'+surveyID //For testing
        };
        axios(config)
        .then(response => {
            // get respondentID
            console.log(response.data);
            var respondentID = response.data["id"];
            console.log(respondentID);
            submitQuestions(respondentID);
            alert("Your answers were submitted successfully.");
        })
    };

    //submit questions const 
    const submitQuestions = (respondentID) => {
        questionList.forEach((question) => {
            if(question["id"] in answerList) {
                var answer = {};
                var ansType = "";
                var qType = "";
                var isMsQuestion = false;

                if("options" in question && question["displayFormat"] === "SINGLE_SELECTION") { // MC question
                    ansType = "text";
                    qType = "multipleChoice";
                } else if("options" in question && question["displayFormat"] === "MULTI_SELECTION") { // MS question
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
                    console.log(answerList[question["id"]])
                    answerList[question["id"]].forEach((option, i) => {
                        if(option) {
                            answer["answer"] = question["options"][i];
                            sendAnswerToDB(answer,respondentID);
                        }
                    });
                } else { // send the answer once
                    answer["answer"] = answerList[question["id"]];
                    sendAnswerToDB(answer,respondentID);
                }
            }
        });
    };

    const handleSubmit = ((e) => {
        e.preventDefault();
        createRespondent();
        // format each answer object + send them to the back end DB
        // unanswered questions will not have any associated anwer object

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
                    {("options" in question && question["displayFormat"] === "SINGLE_SELECTION") ? multipleChoiceQuestion(question) : ""}
                    {("options" in question && question["displayFormat"] === "MULTI_SELECTION") ? multipleSelectQuestion(question) : ""}
                    {"max" in question ? numberQuestion(question) : ""}
                    { !("options" in question) && !("max" in question) ? longAnswerQuestion(question) : ""}
                </SurveyContainer>)
                }
                {!(questionList.length === 0) && <BtnContainer><SubmitBtn type="submit" value="SUBMIT SURVEY" /></BtnContainer>}
            </form>
        </MainDiv>
    );
}

export default AnswerSurvey;