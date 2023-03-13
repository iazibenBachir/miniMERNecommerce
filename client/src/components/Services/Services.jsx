import React from "react";
import classes from "./Services.module.scss";
import { MdLocalShipping } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { RiMoneyDollarBoxFill, RiSecurePaymentFill } from "react-icons/ri";
const Services = () => {
  return (
    <section className={classes.wrapper}>
      <div className={classes.service}>
        <div className={classes.icon_wrapper}>
          <MdLocalShipping className={classes.icon} />
        </div>
        <div className={classes.text}>
          <div className={classes.title}>
            <h5>Free Shipping</h5>
          </div>
          <div className={classes.description}>
            <p>Free shipping on all US order or order above $100</p>
          </div>
        </div>
      </div>
      <div className={classes.service}>
        <div className={classes.icon_wrapper}>
          <BiSupport className={classes.icon} />
        </div>
        <div className={classes.text}>
          <div className={classes.title}>
            <h5>Online Support 24/7</h5>
          </div>
          <div className={classes.description}>
            <p>Contact us 24 hours a day, 7 days a week</p>
          </div>
        </div>
      </div>
      <div className={classes.service}>
        <div className={classes.icon_wrapper}>
          <RiMoneyDollarBoxFill className={classes.icon} />
        </div>
        <div className={classes.text}>
          <div className={classes.title}>
            <h5>Money Back Guarantee</h5>
          </div>
          <div className={classes.description}>
            <p>Simply return it within 30 days for an exchange.</p>
          </div>
        </div>
      </div>
      <div className={classes.service}>
        <div className={classes.icon_wrapper}>
          <RiSecurePaymentFill className={classes.icon} />
        </div>
        <div className={classes.text}>
          <div className={classes.title}>
            <h5>Secure Payments</h5>
          </div>
          <div className={classes.description}>
            <p>we ensure 100% secure payment</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
