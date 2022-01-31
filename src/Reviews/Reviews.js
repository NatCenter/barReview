import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { useParams } from "react-router-dom";
import "./Reviews.css";

export const Reviews = () => {
  const [bar, changeBar] = useState({});
  

  const { barId } = useParams();

  useEffect(() => {
    return fetch(`http://localhost:8088/bars/${barId}?_embed=imageBars&_embed=reviews`)
      .then((data) => data.json())
      .then((barData) => {
        changeBar(barData);
      });
  }, []);
  
  return (
    <>
      <h1>{bar.barName}</h1>
      <p>{bar.address}</p>
      {bar.imageBars?.map((image) => {
        return (
          <>
            <img src={image.imageURL1} />
            <img src={image.imageURL2} />
            <img src={image.imageURL3} />
            <img src={image.imageURL4} />
          </>
        );
      })}
      <p>
        {bar.reviews?.map((review) => {
          return (
            <>
              <p>{review.reviewDes}</p>
            </>
          );
        })}
      </p>
    </>
  );
};
