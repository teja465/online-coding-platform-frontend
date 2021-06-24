import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import "./NavBar.css"

export default function NavBar() {
    async function handleLogout(){
        localStorage.removeItem('token')
        window.location.reload()
    }
    return (
       
        <div className="NavBar align-baseline navbar">
            <a href="/" ><h3  className="BrandName">doCode</h3> </a>
            <div className="contributon_links">
                <a href="/contribute-question" style={{color:"white"}} >contribute a problem </a>
                { localStorage.getItem('token') == null? <button onClick={()=>window.location.href="\login"}>Login</button>:<button onClick={()=>handleLogout()}>logout</button>}
            </div>
        </div>
    )
}
