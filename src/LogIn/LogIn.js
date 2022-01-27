import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ApplicationViews } from "../ApplicationViews"

export const LogIn =()=>{
    return (
        <> 
        
        <h1>Log In</h1>
        <p>E-mail: <input type="text"/></p>
        <button type="submit">Enter</button>
        <p><Link to="/Register"> New User c  lick here to log in</Link></p>
        
        </>

    )


}