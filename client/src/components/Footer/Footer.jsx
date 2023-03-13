import React from "react";
import { Link } from "react-router-dom";
import classes from "./Footer.module.scss";
import { BsTelephone } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";
const Footer = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.footer_top_area}>
        <div className={classes.container}>
          <div className={` ${classes.footer_about}`}>
            <Link to={"/"}>
              <img
                className={classes.logo}
                src="https://template.hasthemes.com/martup-v1/p2/img/logo-dark-theme.png"
                alt="website logo"
              />
            </Link>
            <p className={classes.about_desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              impedit dolores optio dolor. Facere, sed?
            </p>
            <p className={classes.about_item}>
              <SlLocationPin className={classes.icon} />
              <span>184 Main Rd E, St Albans VIC 3021, Australia</span>
            </p>
            <p className={classes.about_item}>
              <BsTelephone className={classes.icon} />
              <span>+001 2233 456</span>
            </p>
            <div className={classes.social_media_icons}>
              <Link to={"/"}>
                <FaFacebookF className={classes.social_icon} />
              </Link>
              <Link to={"/"}>
                <FaTwitter className={classes.social_icon} />
              </Link>
              <Link to={"/"}>
                <FaInstagram className={classes.social_icon} />
              </Link>
              <Link to={"/"}>
                <FaLinkedinIn className={classes.social_icon} />
              </Link>
              <Link to={"/"}>
                <FaPinterestP className={classes.social_icon} />
              </Link>
            </div>
          </div>
            <div className={classes.acount_links}>
              <h5>ACCOUNT</h5>
              <ul>
                <li>
                  <Link className={classes.link} to={"/"}>
                    My Account
                  </Link>
                </li>
                <li>
                  <Link className={classes.link} to={"/"}>
                    Orders Tracking
                  </Link>
                </li>
                <li>
                  <Link className={classes.link} to={"/"}>
                    Checkout
                  </Link>
                </li>
                <li>
                  <Link className={classes.link} to={"/"}>
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>
            <div className={classes.quick_links}>
              <h5>QUICK LINKS</h5>
              <ul>
                <li>
                  <Link className={classes.link} to={"/"}>
                    About
                  </Link>
                </li>
                <li>
                  <Link className={classes.link} to={"/"}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link className={classes.link} to={"/"}>
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link className={classes.link} to={"/"}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            
          <div className={`${classes.footer_newsletter}`}>
            <h5>NEWSLETTER</h5>
            <p>
              Subscribe to our newsletter and get 10% off your first purchase
            </p>

            <form action="#">
              <input type="text" placeholder="your email address" />
              <button type="submit" className="site-btn">
                Subscribe
              </button>
            </form>
            <img
              src="https://cdn.shopify.com/s/files/1/0616/9480/4174/files/icon-pay-7-1.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={classes.footer_bottom_area}>
        <p>
          Copyright © <script>document.write(new Date().getFullYear());</script>
          2023 All rights reserved | This template is made with ❤️ by
          <a
            href="https://iazibenbachir.github.io/index.html"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Iaziben
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
