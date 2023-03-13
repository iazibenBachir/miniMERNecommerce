import React, { useState } from "react";
import classes from "./ProductCardSecond.module.scss";
import { Link } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";

const ProductCardSecond = ({ item }) => {
  const dispatch = useDispatch();
  const [activeImgVarient, setActiveImgVarient] = useState(0);
  const handleAddToCart = () => {
    const {
      _id,
      name,
      img,
      price: { current },
      review: { rating },
    } = item;
    dispatch(
      addToCart({ _id, name, img, current, rating, quantity: 1 })
    );
  };
  const handleVarientClick = (index) => {
    setActiveImgVarient(index);
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.card_left_area}>
        <div className={classes.product_main_img_wrapper}>
          <img
            src={item.thumbs[activeImgVarient]}
            className={classes.product_main_img}
            alt=""
          />
          {item.availability === "out of stock" ? (
            <div
              className={`${classes.product_label} ${classes.product_label_stock}`}
            >
              out of stock
            </div>
          ) : item.price.old ? (
            <div
              className={`${classes.product_label} ${classes.product_label_promotion}`}
            >
              {`${Math.ceil(
                ((item.price.old - item.price.current) * 100) /
                  item.price.current
              )} % SALE OFF`}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={classes.product_img_varients_wrapper}>
          {item.thumbs.map((varient, index) => {
            return (
              <div
                key={`${varient}_${index}`}
                className={`${classes.varient} ${
                  activeImgVarient === index ? classes.active : ""
                }`}
                onClick={() => {
                  handleVarientClick(index);
                }}
              >
                <img src={varient} alt="varient" />
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.card_right_area}>
        <Link to={`/${item._id}`} className="link">
          <h5>{item.name} </h5>
        </Link>
        <span className={classes.brand_name}>{item.brand}</span>
        {item.review.votes ? (
          <ReactStars
            className={classes.rating}
            count={5}
            size={22}
            color="gray"
            a11y={true}
            edit={false}
            isHalf="true"
            value={item.review.rating}
            //value={4}
            activeColor="#e3c01c"
          />
        ) : (
          <span></span>
        )}

        <div className={classes.prices_wrapper}>
          <p
            className={`${classes.price} ${
              item.price.old ? classes.red : classes.black
            }`}
          >
            ${item.price.current}
          </p>
          {item.price.old !== 0 && (
            <p className={`${classes.price} ${classes.old_price}`}>
              ${item.price.old}
            </p>
          )}
        </div>
        <p className={classes.product_description}>{item.description}</p>
        <button className={classes.add_cart_btn} onClick={handleAddToCart}>
          <RiShoppingCartLine className={classes.cart_icon} />
          ADD to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCardSecond;
