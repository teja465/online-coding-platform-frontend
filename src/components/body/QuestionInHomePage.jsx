import React, { Component } from 'react'
import { domain } from "../../Shared";
import { useHistory } from 'react-router-dom';



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
            <a href={url} onClick={e=>handleClick(e)}>{question.fields.title}</a>
        </div>
    )
 }