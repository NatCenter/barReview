import { useEffect, useState } from "react/cjs/react.development";
import { useParams } from "react-router-dom";
import "./Reviews.css";

export const Reviews = () => {
  const [bar, changeBar] = useState({});

  const [reviews, setUserReviews] = useState([]);
  const { barId } = useParams();



  useEffect(() => {
     fetch(`http://localhost:8088/bars/${barId}?_embed=imageBars`)
      .then((data) => data.json())
      .then((barData) => {
        changeBar(barData);
       return fetch(`http://localhost:8088/reviews?${barId}&_expand=user`)
     
      })
      .then((res) => res.json())
      .then((reviewsArray) => setUserReviews(reviewsArray));
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
        {reviews.map((review) => {
          return (
            <>
              
              <p>{review.user.name}</p>
              <p>Star(s):{review.star}</p>
              <p>{review.reviewDes}</p>
            </>
          );
        })}
      </p>
    </>
  );
};
