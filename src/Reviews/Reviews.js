import { useEffect, useState } from "react/cjs/react.development";
import { useParams } from "react-router-dom";
import "./Reviews.css";
import { render } from "@testing-library/react";
import ReactDOM from "react-dom";
import React, { Component } from "react";

export const Reviews = () => {
  const [bar, changeBar] = useState({});

  const [reviews, setUserReviews] = useState([]);
  const [reviewsDeleted, updatedReviews] = useState(0);
  const [reviewsEdited,setReviewsEdited]=useState({
    reviewDes:""
  })

  const { barId } = useParams();
  const getUserId = Number(localStorage.getItem("bar_user"));

  useEffect(() => {
    fetch(`http://localhost:8088/bars/${barId}?_embed=imageBars`)
      .then((data) => data.json())
      .then((barData) => {
        changeBar(barData);
        return fetch(
          `http://localhost:8088/reviews?barId=${barId}&_expand=user`
        );
      })

      .then((res) => res.json())
      .then((reviewsArray) => setUserReviews(reviewsArray));
  }, [reviewsDeleted]);

  //deleted reviews fetch
  const deleteReviews = (id) => {
    return fetch(`http://localhost:8088/reviews/${id}`, {
      method: "DELETE",
    }).then(() => {
      updatedReviews(reviewsDeleted + 1);
    });
  };
  //true or false boolean

  const barMusic = bar.liveMusic;
  let trueOrFalseLiveMusic;

  barMusic === true
    ? (trueOrFalseLiveMusic = "yes")
    : (trueOrFalseLiveMusic = "no");

  const barMask = bar.maskRequired;
  let trueOrFalseMaskRequeired;
  barMask === true
    ? (trueOrFalseMaskRequeired = "yes")
    : (trueOrFalseMaskRequeired = "no");

  const barVaccineCard = bar.vaccineCard;
  let trueOrFalseVaccineCard;
  barVaccineCard === true
    ? (trueOrFalseVaccineCard = "yes")
    : (trueOrFalseVaccineCard = "no");

  const barSocialDistancing = bar.socialDistancing;
  let trueorFalseSocialDistcting;
  barSocialDistancing === true
    ? (trueorFalseSocialDistcting = "yes")
    : (trueorFalseSocialDistcting = "no");

  const barStaffMask = bar.staffMask;
  let barStaffMaskedTrueOrFalse;
  barStaffMask === true
    ? (barStaffMaskedTrueOrFalse = "yes")
    : (barStaffMaskedTrueOrFalse = "no");
  //editing reviews
  //react_devtools_backend.js:4061 Warning: render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render.
  // to render out two create elements in react by using the react fragment we can render out as many new elements as we want!
  //https://egghead.io/lessons/react-render-two-elements-side-by-side-with-react-fragments
  //use the defaultValue to make the review description in the box editable

  let change;
  
  const onChange = (event) => {
    change = event.target.value;
    setReviewsEdited(change);
    return change;
  };

  const buttonClick = (e,b) => {
    const theEvent = change;
    let getReviewId = e;
    let getReviewDes=b;
    //console.log(getReviewId)
    
    const reactFragment = (
      <React.Fragment>
        <p key={getReviewId}>{theEvent}</p>
      </React.Fragment>
    );
      
    ReactDOM.hydrate(reactFragment, document.getElementById(getReviewId));

    return fetch(`http://localhost:8088/reviews/${getReviewId}/?_expand=reviewsDes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       reviewDes:theEvent
        
      }),
    })
      .then((data) => data.json())
      .then(() => {
        setReviewsEdited(change);
      }),[];
  };

  let truOrFalse = true;
  const editReview = (reviewId, theReviewDes) => {
    if (truOrFalse) {
      truOrFalse = false;
      const element = reviewId;
      let des = theReviewDes;

      const reactFragment = (
        <React.Fragment>
          <>
            <input
              key={element}
              type="text"
              defaultValue={des}
              onChange={onChange}
            />

            <button
              onClick={() => {
                buttonClick(element,des);
              }}
            >
              done
            </button>
          </>
        </React.Fragment>
      );

      ReactDOM.render(reactFragment, document.getElementById(element));
    } else {
      truOrFalse = true;
    }
  };

  return (
    <>
      <h1>{bar.barName}</h1>
      <p>Does the bar have live music: {trueOrFalseLiveMusic}</p>
      <p>Do you need a mask to get in: {trueOrFalseMaskRequeired}</p>
      <p>Do you need a vaccine card to get in: {trueOrFalseVaccineCard}</p>

      <p>Do you have to social distancing: {trueorFalseSocialDistcting}</p>
      <p>Is the staffed masked : {barStaffMaskedTrueOrFalse}</p>

      <p>Address: {bar.address}</p>

      {bar.imageBars?.map((image) => {
        return (
          <>
            <div className="barImages" key={image.id}>
              <img src={image.imageURL} key={image.id} />
            </div>
          </>
        );
      })}
      {reviews.map((review) => {
        return (
          <>
            <div className="reviews" key={review.id}>
              <p>User Name: {review.user.name} </p>
              <p>Star(s):{review.star}</p>

              <div id={review.id}>
                <p id="elementButton"></p>
                {review.reviewDes}{" "}
              </div>

              <p>
                <img src={review.userImageReview} />
              </p>

              {getUserId === review.userId ? (
                <>
                  <button
                    onClick={() => {
                      editReview(review.id, review.reviewDes);
                    }}
                  >
                    edit
                  </button>

                  <button
                    onClick={() => {
                      deleteReviews(review.id);
                    }}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <p key={review.id}></p>
              )}
            </div>
          </>
        );
      })}
    </>
  );
};
