import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import ReactStars from "react-rating-stars-component";
import React from "react";
import { render } from "react-dom";
import Button from "@mui/material/Button";
import "./newReviewCss.css";

export const NewReviews = () => {
  // make a fetch that gets all the bars in the database
  const [barList, setBars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/bars")
      .then((res) => res.json())
      .then((barArray) => {
        setBars(barArray);
      });
  }, []);

  console.log(barList);
  const [newReview, updateReview] = useState({
    description: "",
    barId: "",
    star: "",
    userImageReview: "",

    userId: parseInt(localStorage.getItem("bar_user")),
  });
  const history = useHistory();
  const sumbitReview = () => {
    const sendReview = {
      reviewDes: newReview.description,
      barId: parseInt(newReview.barId),
      star: newReview.star,
      userImageReview: newReview.userImageReview,

      userId: parseInt(localStorage.getItem("bar_user")),
    };

    const fetchReview = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendReview),
    };
    return fetch("http://localhost:8088/reviews", fetchReview)
      .then((response) => response.json())
      .then(() => {
        history.push("/barlist");
      });
  };
  return (
    <>
      <div className="newReviewForm">
        <h1>Place your review here!</h1>
        <label>Review:</label>
        <textarea
          type="text"
          onChange={(evt) => {
            const copy = { ...newReview };
            copy.description = evt.target.value;
            updateReview(copy);
          }}
        />
        <br></br>
        <select
          onChange={(evt) => {
            const copy = { ...newReview };
            copy.barId = parseInt(evt.target.value);
            updateReview(copy);
          }}
        >
          {barList.map((bar) => {
            return <option value={bar.id}>{bar.barName}</option>;
          })}
        </select>
        <br></br>

        <label>Upload image by copying and pasting the url </label>
  
        <input
          onChange={(evt) => {
            const copy = { ...newReview };
            copy.userImageReview = evt.target.value;
            updateReview(copy);
          }}
        />
        <br></br>
        <label>Star(s)</label>
        <ReactStars
          count={5}
          onChange={(evt) => {
            const copy = { ...newReview };
            copy.star = evt;
            updateReview(copy);
          }}
          size={24}
          activeColor="#ffd700"
        />
        <br></br>
        <Button
          className="sumbitReview"
          variant="contained"
          type="submit"
          onClick={sumbitReview}
        >
          Submit
        </Button>
      </div>
    </>
  );
};
