import React from "react"
import { Route,Redirect  } from "react-router-dom"

import { Register } from "./LogIn/Register"
import { LogIn } from "./LogIn/LogIn"
import { BarList } from "./barList/BarList"
import { NavBar } from "./barList/NavBar"
import { Reviews } from "./Reviews/Reviews"
import { NewReviews } from "./Reviews/newReview"
export const ApplicationViews = () => {
    return (
        <>
         <Route
            render={()=>{
                if(localStorage.getItem("bar_user")){
                    return (
                        <>
                          
                        <Route exact path="/barlist">
                        <NavBar/>
                        <BarList />
                        
                            </Route>
                            
                            <Route exact path="/barlist/:barId(\d+)">
                        <Reviews />
                            </Route>
                            <Route exact path="/barlist/newreview">
                            <NewReviews/>

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