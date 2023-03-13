import React, { useEffect, useState } from "react";
import classes from "./HeaderSidebar.module.scss";
import { GrClose } from "react-icons/gr";

const HeaderSidebar = ({ handleClose }) => {
  const [visible, setVisible] = useState(false);

  const Styles = {
    transform: `translateX(${visible ? 0 : -50}px)`,
    opacity: `${visible ? 1 : 0}`,
    transition: "all ease-out 0.3s",
  };

  useEffect(() => {
    if (handleClose) {
      setTimeout(() => {
        setVisible(true);
      }, 50);
    } else {
      setVisible(false);
    }
  }, [visible, handleClose]);
  return (
    <div className={classes.modal}>
      <div className={classes.modal_content} style={Styles}>
        <div className={classes.modal_heading}>
         
          <div className={classes.close_icon_wrapper} onClick={handleClose}>
            <GrClose className={classes.close_icon} />
          </div>
        </div>

        <div className={classes.modal_main_area}>
          <h1>Header Sidebar</h1>
        </div>
      </div>
      <div className={classes.modal_empty_box} onClick={handleClose}></div>
    </div>
  );
};

export default HeaderSidebar;
