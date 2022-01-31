import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { useParams } from "react-router-dom";
import "./Reviews.css"


export const Reviews = () => {
    const [bar,changeBar]=useState({})
    const [images,changeImages]=useState([])
    
    const {barId}=useParams()
    const {imageURL}=useParams()
    
    
    useEffect(
        ()=>{
            return fetch(`http://localhost:8088/bars/${barId}`)
            .then(barData=>barData.json())
            .then((bar)=>{
                changeBar(bar)
                
                return fetch(`http://localhost:8088/imageBars?barId=${bar.id}`)
                .then(renderId=>renderId.json())
                .then((data)=>{
                    changeImages(data)
                })
            })
        },[barId]
    
    )
    

    console.log(images)
    return (
        <>
       

        <h1>{bar.barName}</h1>
            
          {
               images.map((image)=>{
                  return(
                    <>
                   <img src={image.imageURL1}/>
                   <img src={image.imageURL2}/>
                   <img src={image.imageURL3}/>
                   <img src={image.imageURL4}/>
                   </>
                   
                   )
               })
          }
           

        </>

    )
};
