import React from "react"
import { Route,Redirect  } from "react-router-dom"

import { Register } from "./LogIn/Register"
import { LogIn } from "./LogIn/LogIn"
import { BarList } from "./barList/BarList"
import { NavBar } from "./barList/NavBar"
import { Reviews } from "./Reviews/Reviews"
export const ApplicationViews = () => {
    return (
        <>
         <Route
            render={()=>{
                if(localStorage.getItem("bar_user")){
                    return (
                        <>
                          <NavBar/>
                        <Route exact path="/barlist">
                        <BarList />
                            </Route>
                            <Route exact path="/barlist/:barId(\d+)">
                        <Reviews />
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
    
}