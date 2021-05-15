import React, { useState,useEffect } from 'react'
import {domain} from "../../Shared"
import {QuestionInHomePage  } from "./QuestionInHomePage";
import "./Body.css"
const url =domain+'api/questions'


export  default function Body()
{
    var [questions,setQuestions] = useState([]);

    useEffect(()=>{
        fetch(url)
        .then(response => response.json())
        .then(data =>
        {
            return setQuestions(data)
        })
        .catch(err => alert("Error while fetching data from backend server"))
    },[])
   

    return (
        <div>
            {questions.length ===0?"Fetching questions please wait":""}
            {console.log(questions)}
            <ul className="list-group list-group-flush question_title">
                {questions.map((qn)=> QuestionInHomePage(qn))}
            </ul>
        </div>
    )
}
