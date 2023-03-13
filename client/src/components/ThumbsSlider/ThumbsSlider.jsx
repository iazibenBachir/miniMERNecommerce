import React from "react";
import { useState } from "react";
import classes from "./ThumbsSlider.module.scss";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
const ThumbsSlider = ({ thumbs, handleClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handelSelectedImg = (index) => {
    setCurrentIndex(index);
    console.log(currentIndex);
  };
  const rightArrowClick = () => {
    if (currentIndex < thumbs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      console.log(currentIndex);
    }
  };
  const leftArrowClick = () => {
    if (currentIndex !== 0) {
      console.log(currentIndex);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.heading_wrapper}>
        <span className={classes.current_thumb}>{`${currentIndex+1}/${thumbs.length}`}</span>
        <IoMdClose className={classes.close_icon} onClick={handleClose} />
      </div>
      <div className={classes.main_slider}>
        <img src={thumbs[currentIndex]} alt="product thumb main" />
      </div>
      <div className={classes.arrows_wrapper}>
        <div
          className={`${classes.left_arrow} ${classes.arrow}`}
          onClick={leftArrowClick}
        >
          <MdOutlineKeyboardArrowLeft className={classes.icon} />
        </div>
        <div
          className={`${classes.right_arrow} ${classes.arrow}`}
          onClick={rightArrowClick}
        >
          <MdOutlineKeyboardArrowRight className={classes.icon} />
        </div>
      </div>
    </div>
  );
};

export default ThumbsSlider;
