import React, { useState, useEffect , Component} from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { AgChartsReact } from 'ag-charts-react';
import { MainDiv, SurveyContainer, TitleContainer, SurveyTitleText, Question, SubmitBtn, BtnContainer, MultipleChoiceOption, TextInput } from "./DisplayResponseElements";

function DisplayResponse() {

    let [searchParams] = useSearchParams();
    const surveyID =  searchParams.get("surveyID");
    const [questionList, setQuestionsList] = useState([]);
    const [answerVal, setAnswer] = useState({});
    const [surveyName, setName] = useState("");

    useEffect(() => {
        axios.get(('https://sysc4806-survey-monkey.herokuapp.com/api/v0/respondents/?id=' + surveyID))
        //axios.get(('http://localhost:8080/api/v0/respondents/?id=' + surveyID)) // For testing
        .then(response => {
            console.log(response.data);
            setQuestionsList(response.data["questions"]);
            setName(response.data["name"]);
            //set H1 elements to the surveyName
            document.getElementById("surveyName").innerHTML = surveyName;
            console.log("I COME SOMETIMES!");
            for (var value in response.data["questions"]){
                axiosGet(response.data["questions"][value]["id"]);
            }
        });
      
        
    },[]);

    const axiosGet = (questionID)=>{
        var config = {
            method: 'get',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            },
            url: 'https://sysc4806-survey-monkey.herokuapp.com/api/v0/surveyors/question/'+respondentID,
            //url: 'http://localhost:8080/api/v0/surveyors/question/'+questionID//For testing
        };
        axios(config).then(response=>{
            setAnswer(oldState => ({...oldState, [questionID] : response.data}));
        });
        
    }
    
    const multipleChoiceQuestion = (index) => {
                
        if (index in answerVal) {
            console.log(answerVal[index]);
            var data_list = [];
            for (var vals in answerVal[index]){
                data_list.push({questions: vals, percent:answerVal[index][vals]})
            }
            var state = {
                options: {
                  data: data_list,
                  series: [
                    {
                      type: 'pie',
                      labelKey: 'questions',
                      angleKey: 'percent',
                      innerRadiusOffset: -70,
                    },
                  ],
                },
              };
        
            return <AgChartsReact options={state.options} />;
        }else{
            console.log("NO");
            return(<div>
                xx
                </div>);
        }
       
    }


    const multipleSelectQuestion = (index) => {
        if (index in answerVal) {
            console.log(answerVal[index]);
            var data_list = [];
            for (var vals in answerVal[index]){
                data_list.push({questions: vals, percent:answerVal[index][vals]})
            }
            var state = {
                options: {
                  data: data_list,
                  series: [
                    {
                      type: 'pie',
                      labelKey: 'questions',
                      angleKey: 'percent',
                      innerRadiusOffset: -70,
                    },
                  ],
                },
              };
        
            return <AgChartsReact options={state.options} />;
        }else{
            console.log("NO");
            return(<div>
                xx
                </div>);
        }
    }

    const longAnswerQuestion = (index) => {
        if (index in answerVal) {
            console.log("LONG",answerVal[index]);
            
            var data_list = [];
            var list = '';
            for (var vals in answerVal[index]){
                list += vals + ". "+ answerVal[index][vals]["answer"]+"<br>";
            }
            
            return <div> {list.split('<br>').map(splits => <p>{splits}</p>)}</div>
        } else {
            return <div></div>
        }
        
    }

    const numberQuestion = (index) => {
        if (index in answerVal) {
            var maxValue = 0
            console.log(answerVal[index]);
            var data_list = [];
            for (var vals in answerVal[index]){
                data_list.push({Rating: answerVal[index][vals]["answer"]})
                if(answerVal[index][vals]["answer"] > maxValue) maxValue = answerVal[index][vals]["answer"];
            }
            var state = {
                options: {
                  title: {
                    text: '',
                  },
                  data: data_list,
                  series: [
                    {
                      type: 'histogram',
                      xKey: 'Rating',
                      xName: 'Selection',
                      binCount: maxValue
                    },
                  ],
                  legend: {
                    enabled: false,
                  },
                  axes: [
                    {
                      type: 'number',
                      position: 'bottom',
                      title: { text: '' },
                    },
                    {
                      type: 'number',
                      position: 'left',
                      title: { text: 'Number of Respondents' },
                    },
                  ],
                },
              };
        
            return <AgChartsReact options={state.options} />;
        }else{
            console.log("NO");
            return(<div>
                xx
                </div>);
        }
    }

    const sendAnswerToDB = (answerObj,respondentID) => {
        console.log(JSON.stringify(answerObj));

    }
    


    return (
        <MainDiv>
            <TitleContainer>
                <SurveyTitleText>{surveyName}</SurveyTitleText>
            </TitleContainer>
           
            <form >
                {questionList.map((question, i) => 
                <SurveyContainer key={i}> 
                    <Question>Q{i+1} &nbsp; {question["question"]}</Question><br /> <br />
                    {("options" in question && question["displayFormat"] === "SINGLE_SELECTION") ? multipleChoiceQuestion(question["id"]) : ""}
                    {("options" in question && question["displayFormat"] === "MULTI_SELECTION") ? multipleSelectQuestion(question["id"]) : ""}
                    {"max" in question ? numberQuestion(question["id"]) : ""}
                    { !("options" in question) && !("max" in question) ? longAnswerQuestion(question["id"]) : ""}
                </SurveyContainer>)
                }

            </form>
        </MainDiv>
    );
}




export default DisplayResponse;