
import { Link } from "react-router-dom"
import { Route} from "react-router-dom"
import { useEffect, useState } from "react/cjs/react.development"



export const BarList =()=>{
    
    const [bars,barList]=useState([])
    const [totalReviews,updataReviews]=useState("")
 
    
    useEffect(
        ()=>{
            fetch(`http://localhost:8088/bars?_embed=reviews`)
            .then(res=>res.json())
            .then((barArray)=>{
                barList(barArray)
            })
        },
        []
    )
    

    return (
        <>
        
        
        <h1>Bar list</h1>
        {
            bars.map(
                (barObject)=>{
                    return (
                        <>
                        
                    <p key={`barid--${barObject.id}`}> <Link to={`/barlist/${barObject.id}`}> {barObject.barName}</Link></p>
                        <p>Total Reviews:{barObject.reviews.length}</p>
                        </>
                    )
                }
            )
        }
<Link to={'/barlist/newreview'}>Post your review</Link>
        </>
    )
}