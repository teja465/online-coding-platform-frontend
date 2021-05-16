import React, { Component } from 'react'
import "./NavBar.css"

export default function NavBar() {
    return (
       
            <div className="NavBar align-baseline navbar">
            <a href="/" ><h3  className="BrandName">doCode</h3> </a>
            <div className="contributon_links">
                <a href="/contribute-question" style={{color:"white"}} >contribute a problem </a>
            </div>
            
            
           
            </div>
    )
}
