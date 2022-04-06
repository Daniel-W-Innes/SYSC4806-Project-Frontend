import React from 'react';
import * as PropTypes from "prop-types";
import {
    AddQuestionBtn,
    MainDiv,
    QuestionType,
    QuestionTypeSelect,
    SurveyContainer,
    SurveyFormLabel,
    SurveyRow,
    TextInput
} from "./CreateSurveyElements";

class CreateSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.username = props.username
        this.questionTypes = {
            "Multiple Choice": "multipleChoice",
            "Multiple Select": "multipleChoice",
            "Rating": "number",
            "Long Answer": "text"
        }
        this.displayFormats = {
            "Multiple Choice": "SINGLE_SELECTION",
            "Multiple Select": "MULTI_SELECTION",
        }
        this.state = {name: '', newQuestionName: '', newQuestionType: "Multiple Choice", questions: {}};
    }

    changeState = (event) => {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    createElement = () => {
        if (this.state.questions.hasOwnProperty(this.state.newQuestionName)) {
            alert("Question already exists")
            return
        }
        const type = this.questionTypes[this.state.newQuestionType]
        let questions = this.state.questions
        // eslint-disable-next-line default-case
        switch (type) {
            case "text":
                questions[this.state.newQuestionName] = {type: type, question: this.state.newQuestionName}
                break;
            case "number":
                questions[this.state.newQuestionName] = {
                    type: type,
                    question: this.state.newQuestionName,
                    min: 1,
                    max: 10
                }
                break;
            case "multipleChoice":
                questions[this.state.newQuestionName] = {
                    type: type,
                    question: this.state.newQuestionName,
                    displayFormat: this.displayFormats[this.state.newQuestionType],
                    numOptions: 2,
                    options: ["", ""]
                }
                break;
        }
        this.setState({questions: questions})
    }
    questionsRender = () => {
        let questionList = []
        const keys = Object.keys(this.state.questions)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            questionList = questionList.concat(this.questionRender(key, this.state.questions[key]))
        }
        return questionList
    }

    updateQuestion = (questionName, questionParameter, value) => {
        const obj = this.state.questions;
        obj[questionName][questionParameter] = value
        this.setState({questions: obj});
    }

    questionRender = (name, question) => {
        // eslint-disable-next-line default-case
        switch (question.type) {
            case "text":
                return (
                    <SurveyContainer>
                        <SurveyFormLabel id={"questionType_" + name} htmlfor="surveyQuestion">{name}</SurveyFormLabel>
                        <TextInput id={"question_" + name} name="question" className="Long_M2" type="text"
                                   value={this.state.questions[name].question} onChange={(event) => {
                            this.updateQuestion(name, 'question', event.target.value)
                        }}/><br/>
                    </SurveyContainer>
                )
            case "number":
                return (
                    <SurveyContainer>
                        <SurveyFormLabel id="questionType" htmlfor="surveyQuestion">{name}</SurveyFormLabel>
                        <TextInput id={"question_" + name} name="question" className="Long_M2" type="text"
                                   value={this.state.questions[name].question} onChange={(event) => {
                            this.updateQuestion(name, 'question', event.target.value)
                        }}/><br/>
                        <SurveyContainer>
                            <SurveyFormLabel htmlfor="surveyQuestion">Min Value:</SurveyFormLabel>
                            <TextInput id={"min_" + name} type="number" name="quantity" min="0" max="9999"
                                       value={this.state.questions[name].min} onChange={(event) => {
                                if (event.target.value < this.state.questions[name].max) {
                                    this.updateQuestion(name, 'min', parseInt(event.target.value))
                                } else {
                                    alert("min cannot be more than max")
                                }
                            }}/><br/>
                        </SurveyContainer>
                        <SurveyContainer>
                            <SurveyFormLabel htmlfor="surveyQuestion">Max Value:</SurveyFormLabel>
                            <TextInput id={"max_" + name} type="number" name="quantity" min="0" max="9999"
                                       value={this.state.questions[name].max} onChange={(event) => {
                                if (event.target.value > this.state.questions[name].min) {
                                    this.updateQuestion(name, 'max', parseInt(event.target.value))
                                } else {
                                    alert("Max cannot be less than min")
                                }
                            }}/>
                        </SurveyContainer>
                    </SurveyContainer>
                )
            case "multipleChoice":
                return (
                    <SurveyContainer>
                        <SurveyFormLabel id="questionType" htmlfor="surveyQuestion">{name}</SurveyFormLabel>
                        <SurveyRow>
                            <SurveyFormLabel htmlfor="surveyQuestion">QUESTION</SurveyFormLabel>
                            <TextInput id={"question_" + name} name="question" type="text"
                                       value={this.state.questions[name].question} onChange={(event) => {
                                this.updateQuestion(name, 'question', event.target.value)
                            }}/><br/>
                        </SurveyRow>

                        <SurveyRow>
                            <SurveyFormLabel htmlfor="surveyQuestion">NUMBER OF OPTIONS</SurveyFormLabel>
                            <TextInput type="number" id={"choice_" + name} name="quantity" min="2" max="10"
                                       value={this.state.questions[name].numOptions}
                                       onChange={(event) => {
                                           if (parseInt(event.target.value) > this.state.questions[name].numOptions) {
                                               const obj = this.state.questions[name].options;
                                               obj[parseInt(event.target.value) - 1] = ""
                                               this.updateQuestion(name, 'options', obj)
                                           } else {
                                               const obj = this.state.questions[name].options;
                                               obj.pop()
                                               this.updateQuestion(name, 'options', obj)
                                           }
                                           this.updateQuestion(name, 'numOptions', parseInt(event.target.value))
                                       }}/>
                        </SurveyRow>
                        <SurveyRow>
                            {this.state.questions[name].options.map((_, i) => {
                                return (
                                    <div className='sc-eCImPb jYpmpS'>
                                        <label htmlFor='surveyQuestion'
                                               className='sc-gKclnd eyuFde'>{"Option " + i + " :"}</label>
                                        <input id='option' name='surveyAnswer' type='text' className='sc-furwcr dyUsvD'
                                               value={this.state.questions[name].options[i]}
                                               onChange={(event) => {
                                                   const obj = this.state.questions[name].options;
                                                   obj[i] = event.target.value
                                                   this.updateQuestion(name, 'numOptions', obj)
                                               }}/>
                                    </div>
                                )
                            })}
                        </SurveyRow>
                    </SurveyContainer>
                )
        }
    }

    stateToRequest = () => {
        const output = {};
        output["name"] = this.state.name
        output["questions"] = []
        const keys = Object.keys(this.state.questions)
        for (let i = 0; i < keys.length; i++) {
            let question = this.state.questions[keys[i]]
            if (question["type"] === "multipleChoice") {
                delete question["numOptions"]
            }
            output["questions"][i] = question
        }
        return output
    }
    submitSurvey = () => {
        let request = this.stateToRequest()
        console.log(request)
        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            },
            body: JSON.stringify(request)
        };
        fetch("https://sysc4806-survey-monkey.herokuapp.com/api/v0/surveyors/" + this.username + "/surveys", config)
            //fetch("http://localhost:8080/api/v0/surveyors/" + this.username + "/surveys", config)
            .then(response => response.json())  // convert to json
            .then(json => {
                console.log(json)
                //display survey link for the user in an alert
                prompt("Your survey was created successfully. \n Provide users with your new Survey ID: ", json["id"]);
            })
            .catch(err => console.log('Request Failed', err));
    }

    render() {
        return (
            <MainDiv>
                <SurveyContainer>
                    <SurveyFormLabel htmlfor="surveyTitle">SURVEY TITLE</SurveyFormLabel>
                    <TextInput id="SURVEY_TITLE" name="name" type="text" value={this.state.name}
                               onChange={this.changeState}/>
                </SurveyContainer>
                {this.questionsRender()}
                <SurveyContainer>
                    <SurveyFormLabel htmlfor="surveyQuestion">QUESTION</SurveyFormLabel>
                    <TextInput id="surveyQuestion" name="newQuestionName" type="text" value={this.state.newQuestionName}
                               onChange={this.changeState}/>
                    <QuestionTypeSelect id="mult_type" name="newQuestionType" value={this.state.newQuestionType}
                                        onChange={this.changeState}>
                        <QuestionType>Multiple Choice</QuestionType>
                        <QuestionType>Multiple Select</QuestionType>
                        <QuestionType>Rating</QuestionType>
                        <QuestionType>Long Answer</QuestionType>
                    </QuestionTypeSelect>
                    <AddQuestionBtn onClick={this.createElement}>ADD QUESTION</AddQuestionBtn>
                </SurveyContainer>
                <SurveyContainer>
                    <AddQuestionBtn onClick={this.submitSurvey}>SUBMIT SURVEY</AddQuestionBtn>
                </SurveyContainer>
            </MainDiv>
        )
    };
}

CreateSurvey.propTypes = {
    username: PropTypes.string
};

export default CreateSurvey;