import React, { useState,useEffect } from 'react'
import {domain} from "../../Shared"
import {QuestionInHomePage  } from "./QuestionInHomePage";
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
            <h1>This is body component</h1>
            {questions.length ===0?"Fetching questions please wait":""}
            {console.log(questions)}
            {questions.map((qn)=> QuestionInHomePage(qn))}
        </div>
    )
}
