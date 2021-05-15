import React, { useEffect,useState } from 'react'
import { domain } from "../../Shared";
import "./DetailedQuestion.css"
import  Editor  from "./editor/Editor";
import { DifficultyLevel } from "./DifficultyLevelBox";
import { orange, red } from '@material-ui/core/colors';
export function DetailedQuestion(){


    const [question, setquestion] = useState({})
    const [testcases, settestcases] = useState([])
    const [output, setoutput] = useState("")
    const [combined_result, setcombined_result] = useState([])
    
    const  fetchQuestionAndItsTestCases=() => 
        {
            fetch(url)
            .then(resp => resp.json())
            .catch(err =>alert('err'))
            .then(data => {
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

    useEffect(()=>{
        fetchQuestionAndItsTestCases()
        
    },[])
    var output_div =document.getElementById("output_box") 
    return (
        
        <div>
            <div className ="DetailedQuestion">
                <div className="row">
                    <div className ="question_description col-12 col-lg-5">
                        <div className="question_title  row">
                            <div className="row col-8" style={{marginLeft:"5px"}}>
                                {question.fields && question.fields.title}
                            </div>
                            <div className="row col-2"> </div>

                            <div className="row col">
                                { question.fields && showDifficultyLevel(question.fields.difficulty)}
                            </div>
                                            
                            </div>
                        
                       {question.fields && <p className="question_statement">{question.fields.statement}</p>}
                        {question.fields && <p> Constraints : {question.fields.constraints}</p>}
                        {question.fields && <p> Points : {question.fields.points}</p>}
                        
                        
                        {/* test cases */}
                        {testcases.length==0 && <p style={{color:"red"}}> No testcases for this question click <a href="#"> here </a> to contribute</p>}
                        {testcases.map((tc,ind)=>
                        <div>
                            <code>
                                <h4>Sample testcase {ind+1}</h4>
                                <p>Input: {tc.fields.input}</p>
                                <p>Output : {tc.fields.output}</p>
                                <hr/>
                            </code>
                        </div>)}
                    </div>
                    <div className ="code_editor col-12 col-lg-7">
                         {/* code editor here */}
                         <Editor question ={question} setoutput ={setoutput}
                          testcases={testcases}
                          setcombined_result ={setcombined_result}
                           output_div={output_div} />
                    </div>
                </div>
                
                
                <div className="row">
                    <div className ="input_box col-12 col-lg-5"> 
                        type input here
                    </div>
                    <div  id="output_box" className ="output_box  col-12 col-lg-7">
                        {/* {output_div.innerHTML=""} */}
                        <table border="1px">
                            <thead>
                                <th> sample Input </th>
                                <th> Expected output  </th>
                                <th> Actual output  </th>
                                <th> Result  </th>
                            </thead>
                            <tbody>
                    
                            {combined_result.map(res=>DisplayResult(res))}

                            </tbody>

                        </table>
                    </div>
                </div>

            </div>
            
            
        </div>
    )
}
function verdict(a,b){
    if (a.trim()==b.trim()){
        return <p  className="PASSED">PASSED</p>
    }
    return <p className="FAILED">FAILED</p>
}
function DisplayResult(res){
    console.log("In display result ",res)

    if(res.actual_output.message =="ArgumentMissingError: source is needed!"){
        return  <>
        <tr>
            <td> {res.input}</td>
            <td> {res.expected_output}</td>
            <td> PLEASE TYPE CODE </td>
            <td> NA </td>
        </tr>
        </>

    }

    if(res.actual_output.run_status.status=="RE"){
        return  <>
        <tr>
        <td> {res.input}</td>
            <td> {res.expected_output}</td>
            <td style={{color:"red",fontWeight:"larger"}}> Got Runtime ERROR</td>
            <td> NA </td>

        </tr>
        </>
        
    }

    if(res.actual_output.run_status.status=="CE"){
        return  <>
        <tr>
            <td> {res.input}</td>
            <td> {res.expected_output}</td>
            <td style={{color:"red",fontWeight:"larger"}}> Got compile time ERROR</td>
            <td> NA </td>

        </tr>
        </>
        
    }


    
    return <>
    <tr>
        <td> {res.input}</td>
        <td> {res.expected_output}</td>
        <td> {res.actual_output.run_status.output}</td>
        <td> {verdict(res.expected_output,res.actual_output.run_status.output)}</td>
    </tr>
    </> 
}


 const showDifficultyLevel=(level)=>{
     return <p  className={level+"D"}>
         {level}
     </p>
 }