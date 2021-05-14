import React, { Component,useEffect,useState } from 'react'
import { domain } from "../../Shared";


export function DetailedQuestion(){

    const [question, setquestion] = useState({})
    const [testcases, settestcases] = useState([])

    function getIdFromUrl(){
        const pk=window.location.pathname.substr(9,)
        return pk
    }
    const pk = getIdFromUrl()
    var url =`${domain}api/problem/title/${pk}`
    console.log("URL is ",url)

    useEffect(()=>{
        fetch(url)
        .then(resp => resp.json())
        .catch(err =>alert('err'))
        .then(data => {
             console.log("Data is ",data)
             var testcases =[];
             var i=0;
             for (i = 0; i < data.length; i++) {
                 if (i>0){
                    testcases.push(data[i])
                 }
              }
              settestcases(testcases)
             
             return setquestion(data[0])
            } )
    },[])
        
    return (
        
        <div>
            {console.log("Question is",question)}
            {question.fields && <h2>{question.fields.title}</h2>}
            
            {question.fields && <p>{question.fields.statement}</p>}
            {question.fields && <p> Difficulty : {question.fields.difficulty}</p>}
            {question.fields && <p> Constraints : {question.fields.constraints}</p>}
            {question.fields && <p> Points : {question.fields.points}</p>}

            {console.log("tc are ",testcases)}
            <hr/>
            {testcases.map((tc,ind)=><div>
                <h4>Sample testcase {ind+1}</h4>
                <p>Input: {tc.fields.input}</p>
                <p>Output : {tc.fields.output}</p>
                <hr/>
            </div>)}
            
            
        </div>
    )
}