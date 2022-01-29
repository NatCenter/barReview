import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { useParams } from "react-router-dom";
export const Reviews = () => {
    const [bar,showBarName]=useState({})
    const {barId}=useParams()
    useEffect(
        ()=>{
            return fetch(`http://localhost:8088/bars/${barId}`)
            .then(renderId=>renderId.json())
            .then((data)=>{
                showBarName(data)
                
            })
        },[barId]

    )
    return (
        <>
        
        <h1>{bar.barName}</h1>
        </>

    )
};
