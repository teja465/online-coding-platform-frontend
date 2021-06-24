import React from 'react'
import { useState } from 'react'
import { domain } from "../../../Shared";
export default function Login() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    async function handleLogout(){
        localStorage.removeItem('token')
    }
    async function test_auth(){
        const url =`${domain}api/auth_test`
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `${localStorage.getItem('token')}`
             },
           
            }
        const response =await  fetch(url,requestOptions)
        const data = await response.json()
        console.log(data)
    }
    async function handleLoginRequest(e){
        e.preventDefault()
        console.log(username,password)
        const url =`${domain}api/login`
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

            if(result.token){
                localStorage.setItem('token',result.token)
            }
            if(result.failure){
                alert("Invalid credentials \n please try again")
            }
            if(result.success){
                alert("successfully logged in ")
                setTimeout(function(){window.location.href="/"},2000)

            }


    }
    return (
        <div>
            <form action="">
                <br /><br /><br />
                <input type="text" onChange={(e)=>setusername(e.target.value)}  placeholder="usernamae"/> <br /> <br />
                <input type="password" onChange={(e)=>setpassword(e.target.value)}  placeholder="Password" /> <br />
                <button type="submit" onClick={(e)=>handleLoginRequest(e)}>Login</button> <br />
                Dont have an account create one <a href="/signup"> signup</a>

            </form>
            

            
        </div>
    )
}
