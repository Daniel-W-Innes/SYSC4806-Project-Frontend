import styled from "styled-components";

export const MainDiv = styled.div`
    background: #000A;
    min-height:100%;
`
export const TitleContainer = styled.div`
    display: table;
    width: 60%;
    border-radius: 10px;
    background: #FFFF;
    padding: 2%;
    text-align: center;
    align-items: center;
    margin: auto;
    margin-bottom: 15px;
`

export const SurveyContainer = styled.div`
    display: table;
    width: 60%;
    height: 20%;
    border-radius: 10px;
    background: #FFFF;
    padding: 2%;
    text-align: center;
    align-items: center;
    margin: auto;
    margin-bottom: 15px;
`
export const SurveyTitleText = styled.h1`
    float: left;
    font-weight: 500;
`

export const Question = styled.p`
    float: left;
    font-weight: 300;
`

export const MultipleChoiceOption = styled.div`
    text-align: left;
    font-weight: 100;
`

export const RangeOption = styled.div`
    text-align: left;
    font-weight: 100;
`

export const RangeQuestionTable = styled.table`
    width: 100%
`
export const TextInput = styled.input`
    height: 50%;
    width: 50%;
    display: table-cell;
    padding: 0 0 0 5px
`

export const BtnContainer = styled.div`
    left: 50%;
    position: absolute;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
`

export const SubmitBtn = styled.input`
    margin: auto;
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
