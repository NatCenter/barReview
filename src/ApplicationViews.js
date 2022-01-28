import React from "react"
import { Route,Redirect  } from "react-router-dom"

import { Register } from "./LogIn/Register"
import { LogIn } from "./LogIn/LogIn"
import { BarList } from "./barList/BarList"
export const ApplicationViews = () => {
    return (
        <>
         <Route
            render={()=>{
                if(localStorage.getItem("bar_user")){
                    return (
                        <>
                        <Route path="/barlist">
                        <BarList />
                            </Route>
                        </>
                    )
                }else{
                    return <Redirect to="/login"/>
                }


            }}
         
         />
        <Route path="/login">
            <LogIn/>
        </Route >
        
            <Route path="/register">
                <Register />
            </Route>
            

        </>
    )
    //first commit
}