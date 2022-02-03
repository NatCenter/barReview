import { useEffect, useState } from "react/cjs/react.development";
import { useParams } from "react-router-dom";
import "./Reviews.css";

export const Reviews = () => {
  const [bar, changeBar] = useState({});

  const [reviews, setUserReviews] = useState([]);
  const [reviewsDeleted,updatedReviews]=useState(0)
  
  const { barId } = useParams();
  const getUserId = Number( localStorage.getItem("bar_user"));
  
  
  
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
  const deleteReviews = (id) => {
  
   return fetch(`http://localhost:8088/reviews/${id}`, {
      method: "DELETE"
      
    }
    
    ).then(()=>{
      updatedReviews(reviewsDeleted+1)
    });
  };
  const barMusic=bar.liveMusic
  let trueOrFalseLiveMusic

   barMusic===true? trueOrFalseLiveMusic="yes" :trueOrFalseLiveMusic="no"
  
  
  const barMask=bar.maskRequired
  let trueOrFalseMaskRequeired
  barMask ===true? trueOrFalseMaskRequeired="yes":trueOrFalseMaskRequeired="no"

 
  
  const barVaccineCard=bar.vaccineCard
  let trueOrFalseVaccineCard
  barVaccineCard===true?trueOrFalseVaccineCard="yes": trueOrFalseVaccineCard="no"



  
  const barSocialDistancing=bar.socialDistancing
  let trueorFalseSocialDistcting
  barSocialDistancing===true?trueorFalseSocialDistcting="yes":trueorFalseSocialDistcting="no"



  const barStaffMask=bar.staffMask
  let barStaffMaskedTrueOrFalse
  barStaffMask===true?barStaffMaskedTrueOrFalse="yes":barStaffMaskedTrueOrFalse="no"

 
  return (
    
    <>
      <h1>{bar.barName}</h1>
      <p>Does the bar have live music:  {trueOrFalseLiveMusic}</p>
      <p>Do you need a mask to get in:  {trueOrFalseMaskRequeired}</p>
      <p>Do you need a vaccine card to get in:  {trueOrFalseVaccineCard}</p>
      
      <p>Do you have to social distancing:  {trueorFalseSocialDistcting}</p>
      <p>Is the staffed masked :  {barStaffMaskedTrueOrFalse}</p>
      

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
                
                  
                
                  <div class="reviewImages">
                  <img src={review.userImageReview} />
                  
               
                  </div>


              {getUserId===review.userId?<button
                onClick={() => {
                  
                  deleteReviews(review.id)
                  
                }}
              >
                Delete
              </button>:
              <p></p>
               }
              
            </>
          );
        })}
      </p>
    </>
  );
};
