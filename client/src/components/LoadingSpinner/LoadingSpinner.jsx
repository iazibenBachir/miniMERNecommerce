import React from "react";
import classes from "./LoadingSpinner.module.scss";
const LoadingSpinner = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.loader}>
        <div className={classes.bar}></div>
        <div className={classes.bar2}></div>
        <div className={classes.bar3}></div>
        <div className={classes.bar4}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
