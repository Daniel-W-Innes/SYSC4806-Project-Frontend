import styled from "styled-components";

export const MainDiv = styled.div`
    padding-top: 10%;
    background: #000A;
`
export const SurveyContainer = styled.div`
    display: table;
    width: 60%;
    height: 20%;
    border-radius: 10px;
    background: #FFFF;
    padding: 2.5%;
    text-align: center;
    align-items: center;
    margin: auto;
    margin-bottom: 5%;
`
export const SurveyTitleText = styled.h1`
    float: left;
    color: #fff;
    font-weight: 500;
`
export const SurveyFormLabel = styled.label`
    color: #000000;
    display: table-cell;
    width: 1px;
    white-space: nowrap
`
export const Span = styled.span`
    display: table-cell;
    padding: 0 0 0 5px;
`
export const SurveyRow = styled.div`
    display: table-row;
    padding: 0 0 0 5px;
`
export const TextInput = styled.input`
    height: 50%;
    width: 50%;
    display: table-cell;
    padding: 0 0 0 5px
`


export const QuestionTypeSelect = styled.select`
  max-width: 50%;
  height: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

export const QuestionType = styled.option`
  color: ${(props) => (props.selected ? "lightgrey" : "black")};
`;

export const AddQuestionBtn = styled.button`
    width: 100%;
    margin: 25px 0;
    font-size: 18px;
    border-radius: 4px;
    background: #7A63FF;
    padding: 12px 50px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #3DED97;
        color: #FFFF;
    }
`
