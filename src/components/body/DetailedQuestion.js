import React, { useEffect,useState } from 'react'
import { domain } from "../../Shared";
import "./DetailedQuestion.css"

export function DetailedQuestion(){


    const [question, setquestion] = useState({})
    const [testcases, settestcases] = useState([])

    const  fetchQuestionAndItsTestCases=() => 
        {
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
        }

    function getIdFromUrl(){
        const pk=window.location.pathname.substr(9,)
        return pk
    }
    const pk = getIdFromUrl()
    var url =`${domain}api/problem/title/${pk}`
    console.log("URL is ",url)

    useEffect(()=>{
        fetchQuestionAndItsTestCases()
        
    },[])
        
    return (
        
        <div>
            {/* {console.log("Question is",question)}
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
            </div>)} */}

            <div className ="DetailedQuestion">
                <div className="row">
                    <div className ="question_description col-12 col-lg-5">
                        question description here
                        {question.fields && <p>{question.fields.statement}</p>}
                        {question.fields && <p> Difficulty : {question.fields.difficulty}</p>}
                        {question.fields && <p> Constraints : {question.fields.constraints}</p>}
                        {question.fields && <p> Points : {question.fields.points}</p>}
                        <p>loremaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaloremaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaloremaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaavvloremaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaloremaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                        {/* test cases */}
                        {testcases.map((tc,ind)=>
                        <div>
                            <h4>Sample testcase {ind+1}</h4>
                            <p>Input: {tc.fields.input}</p>
                            <p>Output : {tc.fields.output}</p>
                            <hr/>
                        </div>)}
                    </div>
                    <div className ="code_editor col-12 col-lg-7">
                         code editor here
                    </div>
                </div>
                
                {/* <div className="row">
                    <div className=".col-1 col-lg-3"></div>
                    <div className=".col-10 col-lg-6">gap for any message/alert/settings to show here</div>
                    <div className=".col-1 col-lg-3"></div>
                </div> */}
                <div className="row">
                    <div className ="input_box col-12 col-lg-5"> 
                        input will be taken from here
                    </div>
                    <div className ="output_box code_editor col-12 col-lg-7">
                        outputs will be hown here
                    </div>
                </div>

            </div>
            
            
        </div>
    )
}