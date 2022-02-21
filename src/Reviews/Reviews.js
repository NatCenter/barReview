import { useEffect, useState } from "react/cjs/react.development";
import { useParams } from "react-router-dom";
import "./Reviews.css";
import { render } from "@testing-library/react";
import ReactDOM from "react-dom";
import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";
import star from "react-rating-stars-component/dist/star";
import Button from "@mui/material/Button";

export const Reviews = () => {
  const [bar, changeBar] = useState({});

  const [reviews, setUserReviews] = useState([]);
  const [reviewsDeleted, updatedReviews] = useState(0);
  const [reviewsEdited, setReviewsEdited] = useState({
    reviewDes: "",
    star: "",
  });

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
  let starChange;
  let imageURLChange;
  const noChange = (element, reviewDes, Stars, images) => {
    const nonChange = (
      <React.Fragment>
        <p>Star(s):<ReactStars value={Stars} edit={false}  size={24}></ReactStars></p>
        <p>{reviewDes}</p>
        <img src={images} />
      </React.Fragment>
    );
    ReactDOM.hydrate(nonChange, document.getElementById(element));
  };

  const onChange = (event) => {
    change = event.target.value;

    setReviewsEdited(change);

    return change;
    
  };
  const changeStarts = (numberOfStarts) => {
    starChange = numberOfStarts;
    setReviewsEdited(starChange);
    return starChange;
  };

  const changeImage = (userImages) => {
    imageURLChange = userImages.target.value;
    
    setReviewsEdited(imageURLChange);
    return imageURLChange;
  };
  const buttonClick = (e,des,star,images) => {
    
    //edit the review description
    console.log("rest")

    let theEvent=change;
    console.log(des)
    if(theEvent==undefined){
      theEvent=des
    }
    else if (theEvent){theEvent=change}
    //edit stars
    let changeStars
    
    if (starChange==undefined){
      changeStars=star
    }
    else if(starChange){changeStars=starChange}
    //edit the images
    let changeImages
   
    
    if(imageURLChange==undefined){
      
      changeImages=images
    }
    // if the user just wants to get rid of the image and keep the review and the starts they put
    else if(imageURLChange==""){
      changeImages=""
    }
   
    else if (imageURLChange) {changeImages=imageURLChange}
    //gets the review  id 
    
    let getReviewId = e;

    const reactFragment = (
      <React.Fragment>
        <p>Star(s):<ReactStars value={changeStars} edit={false}  size={24}></ReactStars></p>
        <p>{theEvent}</p>
        <img src={changeImages} />
      </React.Fragment>
    );

    ReactDOM.hydrate(reactFragment, document.getElementById(getReviewId));

    return (
      fetch(
        `http://localhost:8088/reviews/${getReviewId}/?_expand=reviewsDes`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reviewDes: theEvent,
            star: changeStars,
            userImageReview: changeImages,
          }),
        }
      )
        .then((data) => data.json())
        .then(() => {
          setReviewsEdited(des);
        }).then(()=>{
          fetch(`http://localhost:8088/reviews?barId=${barId}&_expand=user`)
          .then((data) => data.json()).then((parsedData)=>{
            setUserReviews(parsedData)
          })
        }),
      []
    );
  };

  let truOrFalse = true;
  const editReview = (reviewId, theReviewDes, reviewStar, reviewImage) => {
    if (truOrFalse) {
      truOrFalse = false;
      const element = reviewId;
      const des = theReviewDes;
      const star = reviewStar;
      const image = reviewImage;

      const reactFragment = (
        <React.Fragment>
          <>
            <textarea
              key={element}
              type="text"
              defaultValue={des}
              onChange={onChange}
            />
            <ReactStars
              count={5}
              size={24}
              activeColor="#ffd700"
              onChange={changeStarts}
              value={star}
            />
            <label>Change your image by copy and pasting a new url </label>
            <input type="text" defaultValue={image} onChange={changeImage} />
            <Button
              variant="contained"
              onClick={() => {
                buttonClick(element,des ,star,image);
              }}
            >
              done
            </Button>

            <Button
              onClick={() => {
                noChange(element, des, star, image);
              }}
            >
              cancel
            </Button>
          </>
        </React.Fragment>
      );

      ReactDOM.render(reactFragment, document.getElementById(element));
    } else {
      truOrFalse = true;
    }
  };

  // slide show react tut
  //https://tinloof.com/blog/how-to-build-an-auto-play-slideshow-with-react

  const ShowBar = bar.imageBars?.map((images) => {
    return (
      <>
        <div>
          <img className="barImages" src={images.imageURL} />
        </div>
      </>
    );
  });

  const colors = [1, 2, 3, 4];

  const [index, setIndex] = React.useState(0);

  return (
    <>
      <h1 className="title">{bar.barName}</h1>
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {colors.map((backgroundColor, index) => (
            <div className="slide" key={index} style={{ backgroundColor }}>
              <div>{ShowBar ? ShowBar[index] : ""}</div>
            </div>
          ))}
        </div>

        <div className="slideshowDots">
          {colors.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="reviewTrueOrFalse">
        <p>Does the bar have live music: {trueOrFalseLiveMusic}</p>
        <p>Do you need a mask to get in: {trueOrFalseMaskRequeired}</p>
        <p>Do you need a vaccine card to get in: {trueOrFalseVaccineCard}</p>

        <p>Do you have to social distancing: {trueorFalseSocialDistcting}</p>
        <p>Is the staffed masked : {barStaffMaskedTrueOrFalse}</p>

        <p>Address: {bar.address}</p>
      </div>
      {reviews.map((review) => {
        return (
          <>
          <br></br>
            <div className="reviews" key={review.id}>
              <h5>User Name: {review.user.name} </h5>

              <div id={review.id}>
                <p>Star(s):<ReactStars value={review.star} edit={false}  size={24}></ReactStars></p>
                <p id="elementButton"></p>
                {review.reviewDes}{" "}
                <p>
                  <img src={review.userImageReview} />
                </p>
              </div>

              {getUserId === review.userId ? (
                <>
                
                  <p>
                    <Button
                      variant="contained"
                      onClick={() => {
                        editReview(
                          review.id,
                          review.reviewDes,
                          review.star,
                          review.userImageReview
                        );
                      }}
                    >
                      edit
                    </Button>
                    &nbsp;
                    <Button
                      variant="contained"
                      onClick={() => {
                        deleteReviews(review.id);
                      }}
                    >
                      Delete
                    </Button>
                  </p>
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
