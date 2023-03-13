import React, { useState } from "react";
import classes from "./Collapsible.module.scss";
import { IoIosArrowUp } from "react-icons/io";
const Collapsible = ({ children, label }) => {
  const [open, setOpen] = useState(true);
  const iconStyes = {
    transform: `rotate(${open ? 0 : 180}deg)`,
    // transform: `translateY(${showCart ? 0 : -30}px)`,
    transition: "all ease-out 0.4s",
  };
  const toggleCollapsible = () => {
    setOpen(!open);
  };
  return (
    <div className={classes.collapsible}>
      <div
        className={classes.collapsible_label_wrapper}
        onClick={toggleCollapsible}
      >
        <h5 className={classes.collapsible_label_name}>{label}</h5>
        <IoIosArrowUp className={classes.toggle_btn} style={iconStyes} />
      </div>
      {open && <div className={classes.collapsible_content}>{children}</div>}
    </div>
  );
};

export default Collapsible;
