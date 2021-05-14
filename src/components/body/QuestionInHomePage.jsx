import React, {  } from 'react'
import { domain } from "../../Shared";
import { useHistory } from 'react-router-dom';
import { DifficultyLevel } from "./DifficultyLevelBox";
import "./QuestionInHomePage.css"

 export  function QuestionInHomePage(question)
 {
    const history = useHistory();

     function handleClick(e){
        e.preventDefault();
        history.push(`/problem/${question.pk}`)
     }
    const url = domain+'api/problem/'+question.fields.title+'/'+question.pk

    return (
        <div>
            <li className ="list-group-item question-title">
            <div className="row">
                <div className="col-10 col-lg-10">
                    <a href={url} onClick={e=>handleClick(e)}>{question.fields.title}</a>
                </div>
                <div className={"col-2 col-lg-2 "+question.fields.difficulty}>
                    {DifficultyLevel(question.fields.difficulty)}
                </div>
            </div>
            </li>
        </div>
    )
 }