import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import ReactStars from "react-rating-stars-component";
import React from "react";
import { render } from "react-dom";

export const NewReviews = () => {
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
      userImageReview:newReview.userImageReview,
     
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
      <select
        onChange={(evt) => {
          const copy = { ...newReview };
          copy.barId = evt.target.value;
          updateReview(copy);
        }}
      >
        <option value={1}>Bar Sovereign</option>
        <option value={2}>Bar Louie - Nashville</option>
        <option value={3}>Gertie's Whiskey Bar: Nashville, Tennessee</option>
        <option value={4}>Hops and Crafts</option>
      </select>
      <label>Upload image by copying and pasting the url </label>
      <input
        onChange={(evt) => {
          const copy = { ...newReview };
          copy.userImageReview = evt.target.value;
          updateReview(copy);
        }}
      />
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
      <button type="submit" onClick={sumbitReview}>
        Submit
      </button>
    </>
  );
};
