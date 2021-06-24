import React,{useState} from 'react'
import { domain } from "../../../Shared";


export default function Signup(e) {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")
    async function handleCreateAccount(e){
        // alert("Create ac clicked ")
        e.preventDefault()

        console.log(username,password)
        console.log(username,password)
        const url =`${domain}api/signup`
            // var input_testcase=testcase;
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                        username,password
                })
            };
            
            const response = await fetch(url,requestOptions);
            const result = await response.json();
            console.log(result)
            
            if(result.success){
                alert(" User successfully created \n Please login  ")
            }
            else{
                alert(result.message)
            }

    }
    return (
        <div>
            <form >
                <h3>Create an account </h3>
                <input required type="text" onChange={(e)=>setusername(e.target.value)}  placeholder="usernamae"/> <br /> <br />
                <input type="email" onChange={(e)=>setemail(e.target.value)}  placeholder="Email" /> <br />
                <input required type="password" onChange={(e)=>setpassword(e.target.value)}  placeholder="Password" /> <br />
                
                <button type="submit" onClick={(e)=>handleCreateAccount(e)}>Signup</button>
            </form>
        </div>
    )
}
