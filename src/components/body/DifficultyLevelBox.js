import React, { Component } from 'react'
import "./DifficultyLevel.css"
export function DifficultyLevel(level) {

    return (
        <div>
            <div className={"centre "+level}>
                {level}

            </div>
        </div>
    )
    
}