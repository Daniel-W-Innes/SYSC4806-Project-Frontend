import React, {useState} from "react";
import {MainDiv, SurveyContainer, TitleContainer, SurveyTitleText, Question, SubmitBtn, BtnContainer, MultipleChoiceOption, TextInput} from "./AnswerSurveyElements";

// TODO: fetch survey from database + submit answers to database
function AnswerSurvey() {

    // for now - to see what it looks like
    const questionList = [{"name": "Pick a choice", "type": "MCQ", "choices":["c1", "c2", "c3"]},
                          {"name": "Pick a choice2", "type": "MCQ", "choices":["c1", "c2"]},
                          {"name": "Enter an answer", "type": "text"},
                          {"name": "Pick a number", "type": "rate", "min":1, "max":10},
                          {"name": "Pick choices", "type": "MS", "choices":["c1", "c2", "c3"]}];

    // Setting state variables
    var mcQs = {};
    var msQs = {};
    var textQs = {};
    var rateQs = {};
    questionList.forEach((question) => {
        if(question["type"] === "MCQ") {
            mcQs[question["name"]] = new Array(question["choices"].length).fill(false);
        } else if(question["type"] === "MS") {
            msQs[question["name"]] = new Array(question["choices"].length).fill(false);
        } else if(question["type"] === "long") {
            textQs[question["name"]] = "";
        } else {
            rateQs[question["name"]] = "";
        }
    });
    const [mcQuestions, setMCQuestions] = useState( mcQs );
    const [msQuestions, setMSQuestions] = useState( msQs );
    const [textQuestions, setTextQuestions] = useState( textQs );
    const [rateQuestions, setRateQuestions] = useState( rateQs );

    // Get survey questions - TODO
    /*useEffect(() => {
        axios.get('https://sysc4806-survey-monkey.herokuapp.com/api/v0/surveyors/DEFAULT/surveys')
        .then(response => {
            console.log(response.data);
            setQuestionList(response.data);
        });
    }, []);*/

    const handleOnMCChange = (question, choicePosition) => {
        console.log("called");
        var qName = question["name"];
        const updatedChecked = mcQuestions[qName].map((item, index) =>
            index === choicePosition ? item = true : item = false
        );

        var newMCQuestions = mcQuestions;
        newMCQuestions[qName] = updatedChecked;
        setMCQuestions(newMCQuestions);
        console.log(mcQuestions);
    };

    const multipleChoiceQuestion = (question) => {
        return(<div>
            {question["choices"].map((name, i) => 
                <MultipleChoiceOption className={question["name"]} key={i}>
                    <label>
                        <input
                            type="radio"
                            name={question["name"]}
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
        console.log("called2");
        var qName = question["name"];
        const updatedChecked = msQuestions[qName].map((item, index) =>
            index === choicePosition ? !item : item
        );

        var newMSQuestions = msQuestions;
        newMSQuestions[qName] = updatedChecked;
        setMSQuestions(newMSQuestions);
        console.log(msQuestions);
    };

    const multipleSelectQuestion = (question) => {
        return(<div>
            {question["choices"].map((item, i) => 
                <MultipleChoiceOption className="checkbox" key={i}>
                    <label>
                        <input
                            type="checkbox"
                            value={question["name"]}
                            onChange={() => handleOnMSChange(question, i)}
                        />
                        &nbsp;{item}
                    </label> <br />
                </MultipleChoiceOption>)
            }
        </div>);
    }

    const handleOnTextChange = (question, e) => {
        console.log("called3");
        var qName = question["name"];
        var newTextQuestions = textQuestions;
        newTextQuestions[qName] = e.target.value;
        setTextQuestions(newTextQuestions);
        console.log(textQuestions);
    };

    const longAnswerQuestion = (question) => {
        return(<div>
            <TextInput 
                name={question["name"]} 
                type="text" 
                value={textQuestions[question["name"]]} 
                onChange={(e) => handleOnTextChange(question, e)} 
            />
        </div>);
    }

    const handleOnRateChange = (question, e) => {
        console.log("called4");
        var qName = question["name"];
        var newRateQuestions = rateQuestions;
        newRateQuestions[qName] = e.target.value;
        setRateQuestions(newRateQuestions);
        console.log(rateQuestions);
    };

    const rateQuestion = (question) => {
        return(<div>
            <input
                type="number"
                name={question["name"]}
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
                {questionList.map((item, i) => 
                <SurveyContainer key={i}> 
                    <Question>Q{i+1} &nbsp; {item["name"]}</Question><br /> <br />
                    {item["type"] === "MCQ" ? multipleChoiceQuestion(item) : ""}
                    {item["type"] === "MS" ? multipleSelectQuestion(item) : ""}
                    {item["type"] === "text" ? longAnswerQuestion(item) : ""}
                    {item["type"] === "rate" ? rateQuestion(item) : ""}
                </SurveyContainer>)
                }
                <BtnContainer><SubmitBtn type="submit" value="SUBMIT SURVEY" /></BtnContainer>
            </form>
        </MainDiv>
    );
}

export default AnswerSurvey;