import React, { Component,useState,useEffect } from 'react';

import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button'

import Spinner from 'react-bootstrap/Spinner'
import ClipLoader from "react-spinners/ClipLoader";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";

import * as ace from 'ace-builds'; // ace module ..


import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { domain } from "../../../Shared";


const override = `
  display: block;
  border-color: red;
`;
function Editor({question,setoutput,testcases,output_div,setcombined_result}) {
     const [language, setLanguage] = useState("python")
     const [theme, setTheme] = useState("monokai")
     const [codeTextInput, setcodeTextInput] = useState("")
     const [loading, setloading] = useState(false)
    //  const [userInput, setuserInput] = useState("")
    //  const [output, setoutput] = useState("")
     
    ace.config.set("basePath", "/Scripts/Ace");
    ace.config.set("modePath", "Scripts/Ace");
    ace.config.set("workerPath", "Scripts/Ace");
    ace.config.set("themePath", "Scripts/Ace");


    const languageFormat=(lang)=>{
            if (lang==='python'){
                return "PYTHON3"
            }
            if (lang==='java'){
                return "JAVA"
            }
            if (lang==='javascript'){
                return "JAVASCRIPT"
            }
            return lang
    }


      const handleLanguageChange = (event) => {
        const name = event.target.value;
        console.log('lang change',name)
        setLanguage(name)
      };
      
      const handleCodeTypeChange=(code)=>{
          setcodeTextInput(code)
      }
      
       async function  run_testcase(testcase){
        const url =`${domain}api/compile`
            // var input_testcase=testcase;
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    post_data:{
                        code:codeTextInput,
                        input:testcase,
                        language:languageFormat(language)
                    }
                })
            };
            //  await  fetch(url, requestOptions)
            //     .then(response => {  return  response.json()})
            //     .then(data => {
            //         console.log("resp from backend is ",data)
            //         if (!(data === undefined)){
            //             console.log("dat is not undefined",data===undefined)
            //             return data
            //         }
            //         else{
            //             console.log("in else")
            //         }
                     
            //         // setoutput(data.run_status.output_html)
            //     });
            const response = await fetch(url,requestOptions);
            const result = await response.json();
            // return result.run_status.output
            return result
          
            

    }
     async  function handleCompile() {
          console.log(testcases)
          
          var final_output=[];
          for(var i=0;i<testcases.length;i++)
          {
                var result = await run_testcase(testcases[i].fields.input)
                 console.log("Gotten op is ",result)
                final_output.push(
                    {
                        input:testcases[i].fields.input,
                        expected_output:testcases[i].fields.output,
                        actual_output: result
                    }
                )
          }
          console.log("Final o/p is ",final_output)
          setcombined_result(final_output)

      }
        return (
            <div   style={{backgroundColor:"#F7F7F7",height:"100%"}}>

        <div className="actions" >
            <Spinner />

                {/* language drodown */}
                <Select
                native
                value={language}
                onChange={handleLanguageChange}
                label="Age"
                inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                }}
                >
                        <option value="python">python3</option>
                        <option value="java">java</option>
                        <option value="javascript">javascript</option>
                        <option value="CPP">CPP</option>
                        
                </Select>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {/* theme drodown */}
                <Select
                native
                value={theme}
                onChange={(event)=>{  setTheme(event.target.value)}}
                label="Age"
                inputProps={{
                    name: 'them',
                    id: 'outlined-age-native-simple',
                }}
                >
                        <option value="github">github(light)</option>
                        <option value="monokai">monokai(dark)</option>

                    
                </Select>

                </div>
                
                <div style={{display:"flex",flexWrap:"wrap"}}>
                <div className="left" style={{width:"95%",maxWidth:"800px",backgroundColor:"",marginRight:"10px"}}>
                <div id='ace_editor' >
                        <AceEditor
                                style={{maxWidth:"800px",margin:"1%"}}
                                mode={language}
                                theme={theme}
                                onChange={handleCodeTypeChange}
                                name="UNIQUE_ID_OF_DIV"
                                
                                height="500px"
                                width="95%"
                                fontSize={15}
                                
                            />
                            {loading?<><ClipLoader color={"red"} loading={true} css={override} size={40} /><p>Loading...</p></>:
                            <Button variant="contained" color="primary" href="#contained-buttons"
                            onClick={
                                ()=>{
                                    
                                    handleCompile()
                                }}>
                                Run
                            </Button>}
                    </div>
                </div>

            </div>
                <br/><br/>
                
                </div>
            );
    
}

export default Editor;