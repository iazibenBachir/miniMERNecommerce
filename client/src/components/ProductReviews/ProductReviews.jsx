import React, { useRef, useState } from "react";
import classes from "./ProductReviews.module.scss";
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { addReview } from "../../redux/features/currentProdSlice";
import axios from "axios";
import {
  postNewReview,
  incrementReviews,
} from "../../redux/features/currentProdSlice";
const ProductReviews = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const {
    _id,
    review: { rating, votes },
  } = useSelector((state) => state.currentProd.productDetails);
  const reviews = useSelector((state) => state.currentProd.reviews);
  const user = useSelector((state) => state.auth.user);
  const productReviews = useSelector((state) => state.currentProd.reviews);

  const [tab, setTab] = useState("reviews");
  const [userRating, setUserRating] = useState();
  const reviewTextRef = useRef();
  const ratingChanged = (newRating) => {
    setUserRating(newRating);
  };
  const handleClickTab = (tabName) => {
    if (tabName === "new" && !isLoggedIn) {
      //dispatch(toggleShowAuthModel());
    } else {
      setTab(tabName);
    }
  };
  const API = "http://localhost:4000/api/review";

  const handleSubmitReview = async () => {
    const reviewText = reviewTextRef.current.value;
    const formData = {
      productId: _id,
      user: {
        userName: user.username,
      },
      userReview: {
        rating: userRating,
        text: reviewText,
      },
      review: {
        rating: rating,
        votes: votes,
      },
    };
    if (!userRating) {
      return;
    }
    dispatch(postNewReview(formData));
    //dispatch(incrementReviews());
    /*
    try {
      const response = await axios({
        method: "POST",
        url: API,

        data: {
          productId: id,
          user: {
            userName: user.username,
          },
          userReview: {
            rating: userRating,
            text: reviewText,
          },
          review: {
            rating: rating,
            votes: votes,
          },
        },
        headers: {
          Authorization: "Bearer " + user.jwt,
        },
      });
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
    */
  };
  return (
    <div className={classes.product_reviews_section}>
      <div className={classes.reviews_tab_heading}>
        <h5 className={classes.review_votes}>{votes} Reviews</h5>
        <ReactStars
          className={classes.rating_stars}
          count={5}
          size={35}
          color="gray"
          a11y={true}
          edit={false}
          isHalf="true"
          value={rating}
          activeColor="#fdbc00"
        />
      </div>
      <div className={classes.tabs_wrapper}>
        <span
          className={`${classes.tab} ${
            tab === "reviews" ? classes.active : ""
          }`}
          onClick={() => {
            handleClickTab("reviews");
          }}
        >
          Reviews
        </span>
        <span
          className={`${classes.tab} ${tab === "new" ? classes.active : ""}`}
          onClick={() => {
            handleClickTab("new");
          }}
        >
          Write Review
        </span>
      </div>
      {tab === "reviews" ? (
        <div className={classes.reviews_content}>
          {productReviews &&
            productReviews?.map((review) => {
              return (
                <div key={review._id} className={classes.review_wrapper}>
                  <p className={classes.review_description}>
                    {review.review.text}
                  </p>
                  <ReactStars
                    className={classes.reviewer_stars}
                    count={5}
                    size={20}
                    color="gray"
                    a11y={true}
                    edit={false}
                    isHalf="true"
                    value={review.review.rating}
                    activeColor="#fdbc00"
                  />
                  <div className={classes.reviewer_info}>
                    <span className={classes.reviewer_icon}>
                      {review.user.userName[0]}
                    </span>
                    <h5 className={classes.reviewer_name}>
                      {review.user.userName}
                    </h5>
                    <span className={classes.review_date}>
                      {new Date(review.createdAt).toLocaleDateString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className={classes.new_review}>
          <ReactStars
            className={classes.rating_stars}
            count={5}
            size={35}
            color="gray"
            a11y={true}
            edit={true}
            isHalf="true"
            onChange={ratingChanged}
            //  value={rating}
            activeColor="#fdbc00"
          />
          <input
            type="text"
            placeholder="write review .."
            ref={reviewTextRef}
          />
          <button onClick={handleSubmitReview}>Submit Review</button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
