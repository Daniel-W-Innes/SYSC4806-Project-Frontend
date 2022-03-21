import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SurveyList from '../pages/SurveyList/SurveyList';
import CreateSurvey from './CreateSurvey/CreateSurvey';
import AnswerSurvey from './AnswerSurvey/AnswerSurvey';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<SurveyList />}></Route>
      <Route path='/create-survey' element={<CreateSurvey />}></Route>
      <Route path='/answer-survey' element={<AnswerSurvey />}></Route>
    </Routes>
  );
}

export default Main;