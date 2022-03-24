# SYSC4806-Project - Mini-SurveyMonkey
[![Build Status](https://app.travis-ci.com/Daniel-W-Innes/SYSC4806-Project-Backend.svg?branch=master)](https://app.travis-ci.com/Daniel-W-Innes/SYSC4806-Project-Backend)

## Project Description:
Surveyor can create a survey with a list of Questions. Questions can be open-ended (text), asking for a number within a range, or asking to choose among many options. Users fill out a survey that is a form generated based on the type of questions in the survey. Surveyor can close the survey whenever they want (thus not letting in new users to fill out the survey), and at that point a survey result is generated, compiling the answers: for open-ended questions, the answers are just listed as-is, for number questions a histogram of the answers is generated, for choice questions a pie chart is generated

## Team Members:
- Adi El Sammak
- Astrid MacKinnon
- Daniel Innes
- Erik Iuhas
- Marianne Brissette

## Important Links:
Front-End Deployment: https://sysc4806.brotherwolf.ca/ <br/>
Back-End Deployment: https://sysc4806-survey-monkey.herokuapp.com/ <br/>
Front-End Repo: https://github.com/Daniel-W-Innes/SYSC4806-Project-Frontend <br/>
Back-End Repo: https://github.com/Daniel-W-Innes/SYSC4806-Project-Backend <br/>

## Deliverable 2:
For this deliverable, we have built a basic usable application. The back-end of the application is hosted on **TravisCI** and deployed on **Heroku**. To develop the application, we are using the framework Spring Boot on the back end and React Static for the front end. Note that the code for the back end is here: https://github.com/Daniel-W-Innes/SYSC4806-Project-Backend 

### Model
In this application, we consider that to create surveys, a user must have an account. When the user creates an account, the user becomes a *Surveyor* and can create *Survey* objects. To fill surveys, users do not need accounts. Surveys are composed of a list of *Question* objects. The most basic type of questions is long answer question. These are modeled with the *Question* class. *MultipleChoiceQuestion* are questions where the user must pick an option from a list. These can also be used for True or False questions. *NumberQuestion* are questions where the user is asked to pick a number in a range. When users fill surveys, we create *Answer* objects to record their answers. Answers are associated with one particular *Question* and *Survey*. *TextAnswer* are used for long answer questions and multiple choice questions. *NumberAnswer* are used for number questions. Note that one *Question* has as many *Answer* associated to it as the number of people who answer the question.

![ModelUML](/docs/Models.png)

### Database
The database structure is very similar to the structure of the model classes. We are using a PostgreSQL database hosted on Heroku. One-to-many relationships are modelled with foreign keys and inheritance is modelled with joined tables.

![DatabaseSchema](/docs/DatabaseSchema.PNG)


### Use Case 1: Authentication

This is the use case that allows a surveyor to log in to the application and manage their surveys. The surveyor can create an account or log in as an existing user. Once they are logged in, surveyors can view the list of their own surveys, or create a new survey. In the next milestone, we will add the option to view statistics about the collected answers to surveys.

![Authentication](/docs/Authentication.png)

### Use Case 2: Display list of surveys

Take the list of surveys that were created by a specific surveyor and to display it. The survey names and IDs are stored in the database (back-end) and we format this data into an HTML table before displaying it.

![ListOfSurveys](/docs/ListOfSurveys.png)

### Use Case 3: Create a survey

In this use case, the user can create a new survey and save it to the database. The user needs to specify the name of the survey and the list of questions. Once the survey was successfully created, we provide the surveyor with a link to the survey. This link can be shared to respondents such that they can answer the survey and save their answers.

![CreateSurvey](/docs/CreateSurvey.png)

### Use Case 4: Answer a survey

In this use case, we fetch the survey name from the URL and we use the name to fetch the survey questions from the database. The questions are displayed and the user can answer them. The answers are stored in the state of the application (through React) and when the user clicks "SUBMIT SURVEY", the answers are saved into the database.

![AnswerSurvey](/docs/AnswerSurvey.png)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
