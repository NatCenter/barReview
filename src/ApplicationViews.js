import React from "react"
import { Route } from "react-router-dom"
import { Register } from "./LogIn/Register"
import { LogIn } from "./LogIn/LogIn"
export const ApplicationViews = () => {
    return (
        <>
        <Route path="/login">
            <LogIn/>
        </Route >
            <Route path="/Register">
                <Register />
            </Route>
        </>
    )
}