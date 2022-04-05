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

## Deliverable 3:
Application is now fully functional and deployed. Every use case was implemented. The back-end of the application is hosted on **TravisCI** and deployed on **Heroku**. To develop the application, we are using the framework Spring Boot on the back end and React Static for the front end.

### Model
In this application, we consider that to create surveys, a user must have an account. When the user creates an account, the user becomes a *Surveyor* and can create *Survey* objects. To fill surveys, users do not need accounts, they will be considered as a *Respondent*, but will remain anonymous. Surveys are composed of a list of *Question* objects. The most basic type of questions is long answer question. These are modeled with the *TextAnswerable* class. *MultipleChoiceQuestion* are questions where the user must pick an option from a list. These can also be used for True or False questions. *NumberQuestion* are questions where the user is asked to pick a number in a range. When users fill surveys, we create *Answer* objects to record their answers. Answers are associated with one particular *Question* and *Survey*. *TextAnswer* are used for long answer questions and multiple choice questions. *NumberAnswer* are used for number questions. Note that one *Question* has as many *Answer* associated to it as the number of people who answer the question.

![ModelUML](/docs/Models.png)

### Database
The database structure is very similar to the structure of the model classes. We are using a PostgreSQL database hosted on Heroku. One-to-many relationships are modelled with foreign keys and inheritance is modelled with joined tables.

![DatabaseSchema](/docs/DatabaseSchema.png)


### Use Case 1: Authentication

This is the use case that allows a surveyor to log in to the application and manage their surveys. The surveyor can create an account or log in as an existing user. Once they are logged in, surveyors can view the list of their own surveys, or create a new survey. In the next milestone, we will add the option to view statistics about the collected answers to surveys.

![SignUp](/docs/Authentication1.png)
![LogIn](/docs/Authentication2.png)

### Use Case 2: Display list of surveys

Take the list of surveys that were created by a specific surveyor and to display it. The survey names and IDs are stored in the database (back-end) and we format this data into an HTML table before displaying it. We can click the "CHECK RESULTS" button to get to use case 5.

![ListOfSurveys](/docs/ListOfSurveys.png)

### Use Case 3: Create a survey

In this use case, the user can create a new survey and save it to the database. The user needs to specify the name of the survey and the list of questions. Once the survey was successfully created, we provide the surveyor with the survey ID. The ID can be shared to respondents so they can answer the survey.

![CreateSurvey](/docs/CreateSurvey.png)

### Use Case 4: Answer a survey

In this use case, a respondent can enter a survey ID in the input box on the upper left corner of the page and answer the survey with this ID. We fetch the survey ID from the URL and we use the ID to fetch the survey questions from the database. The questions are displayed and the user can answer them. The answers are stored in the state of the application (through React) and when the user clicks "SUBMIT SURVEY", the answers are saved into the database.

![AnswerSurvey](/docs/AnswerSurvey.png)

### Use Case 5: Display survey results

In this use case, the surveyor can view the answers to a survey that they created. To see the answers, the user has to look at their list of survey (use case 2) and select the specific survey. Answers to long answer questions are presented as a list. Multiple choice answers are presented with pie charts, and number answers are presented with histograms. Anyone can answer a survey, but only the surveyor who created the survey can view its answers. To view  

![DisplayResults1](/docs/DisplayResults1.PNG)
![DisplayResults2](/docs/DisplayResults2.PNG)
