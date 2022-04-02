import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import SurveyList from './pages/SurveyList/SurveyList';
import CreateSurvey from './pages/CreateSurvey/CreateSurvey';
import AnswerSurvey from './pages/AnswerSurvey/AnswerSurvey';
import SignIn from "./pages/SignIn/SignIn"
import SignUp from "./pages/SignUp/SignUp"
import Navbar from './components/Navbar';
import axios from 'axios';

function App() {

  const [surveyorUsername, setSurveyorUsername] = useState("");
  const [isSurveyorLoggedIn, setShowSurveyor] = useState(false);

  useEffect(() => {
      const accessToken = localStorage.getItem("access_token");
      const username = localStorage.getItem("username");
      if (accessToken !== null && username !== null) {
        setLoggedInSurveyorHandler(accessToken, username);
      }
    }, []);

  const setLoggedInSurveyorHandler = (accessToken, username) => {
      if (accessToken !== "" && username !== "") {
        setShowSurveyor(true);
        axios.get(('https://sysc4806-survey-monkey.herokuapp.com/api/v0/surveyors' + username), {
        //axios.get(('http://localhost:8080/api/v0/surveyors/' + username), {
            headers: {
                'Authorization': "Bearer " + accessToken
            }
            }).then(res => {
              setSurveyorUsername(res.data.username)
            }).catch(err => {
                console.log(err.response.data);
            });
      } else {
        setShowSurveyor(false);
      }
  }

  return (
    <Router>
      <Navbar username={surveyorUsername} isLoggedIn={isSurveyorLoggedIn} setSurveyor={setLoggedInSurveyorHandler} />
      <Routes>
          <Route path="/" element={<Home isLoggedIn={isSurveyorLoggedIn} />} />
          <Route path="/survey-list" element={<SurveyList username={surveyorUsername} isLoggedIn={isSurveyorLoggedIn} />} />
          <Route path="/create-survey" element={<CreateSurvey username={surveyorUsername} isLoggedIn={isSurveyorLoggedIn} />} />
          <Route path="/answer-survey" element={<AnswerSurvey/>} />
          <Route path="/signin" element={<SignIn setLoggedInSurveyor={setLoggedInSurveyorHandler} />} />
          <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
