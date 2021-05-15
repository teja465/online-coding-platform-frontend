import React, { useEffect,useState } from 'react'
import { domain } from "../../Shared";
import "./DetailedQuestion.css"
import  Editor  from "./editor/Editor";
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
                        question description here
                        {question.fields && <p>{question.fields.statement}</p>}
                        {question.fields && <p> Difficulty : {question.fields.difficulty}</p>}
                        {question.fields && <p> Constraints : {question.fields.constraints}</p>}
                        {question.fields && <p> Points : {question.fields.points}</p>}
                        <p>loremaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
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
                         {/* code editor here */}
                         <Editor question ={question} setoutput ={setoutput}
                          testcases={testcases}
                          setcombined_result ={setcombined_result}
                           output_div={output_div} />
                    </div>
                </div>
                
                
                <div className="row">
                    <div className ="input_box col-12 col-lg-5"> 
                        input will be taken from here
                    </div>
                    <div  id="output_box" className ="output_box  col-12 col-lg-7">
                        {/* {output_div.innerHTML=""} */}
                        <table>
                            <thead>
                                <th> sample Input </th>
                                <th> Expected output  </th>
                                <th> Actual output  </th>
                                <th> Result  </th>
                            </thead>
                            <tbody>
                            {combined_result.map((res)=>{
                                return <>
                                        <tr> 
                                            <td>{res.input}</td>
                                            <td>{res.expected_output}</td>
                                            <td>{res.actual_output}</td>
                                            <td>{ShowVerdict(res.expected_output,res.actual_output)}</td>
                                        </tr>
                                </>
                                

                                
                            })}


                            </tbody>

                        </table>


                        {/* {combined_result.length>=0? combined_result.map(res=> { return showRow(res)}) : "Click on RUN"} */}
                        
                    </div>
                    
                    

                </div>

            </div>
            
            
        </div>
    )
}
function ShowVerdict(a,b) {
    console.log("In verdict ",a.trim(),b.trim())
    if (a.trim()==b.trim()){
        return "Passed"
    }
    return "Failed"
    
}
function  showResult(combined_result) {
    console.log("In show result ",combined_result)
    return (
        <div>
            <table>
                <thead>
                    <th> sample Input </th>
                    <th> Expected output  </th>
                    <th> Actual output  </th>
                    <th> Result  </th>
                </thead>
                <tbody>
                    
                        {combined_result.map(res => {
                            console.log("in map",res.input,res.expected_output,res.actual_output)
                            return (
                                <tr>
                                    <td>{res.input}</td>
                                    <td>{res.expected_output}</td>
                                    <td>{res.actual_output}</td>
                                    <td>Yes/No</td>
                                </tr>
                            )
                        })}
                    
                </tbody>
            </table>
        </div>
    )

    
}