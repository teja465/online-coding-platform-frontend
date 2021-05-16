import React from 'react'

export default function DisplayResult(res){
    // console.log("In display result ",res)

    if(res.actual_output.message =="ArgumentMissingError: source is needed!"){
        return  <>
        <tr>
            <td> {res.input}</td>
            <td> {res.expected_output}</td>
            <td style={{color:"red",fontWeight:"larger"}} > PLEASE TYPE CODE </td>
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


//  const showDifficultyLevel=(level)=>{
//      return <p  className={level+"D"}>
//          {level}
//      </p>
//  }
 function verdict(a,b){
    if (a.trim()==b.trim()){
        return <p  className="PASSED">PASSED</p>
    }
    return <p className="FAILED">FAILED</p>
}