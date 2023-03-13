import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import classes from "./ProductDetails.module.scss";
import CartAmount from "../../components/CartAmount/CartAmount";
import { RiShoppingCartLine } from "react-icons/ri";
import { IoIosExpand } from "react-icons/io";
import { addToCart } from "../../redux/features/cartSlice";
import ProductReviews from "../../components/ProductReviews/ProductReviews";
import Collapsible from "../../components/Collapsible/Collapsible";
import { useSelector, useDispatch } from "react-redux";

import {
  getProductDetails,
  getProductReviews,
} from "../../redux/features/currentProdSlice";
import ThumbsSlider from "../../components/ThumbsSlider/ThumbsSlider";
const ProductDetails = () => {
  const [thumbSliderOpen, setThumbSliderOpen] = useState(false);
  const dispatch = useDispatch();
  const productDetails = useSelector(
    (state) => state.currentProd.productDetails
  );
  const reviews = useSelector((state) => state.currentProd.reviews);
  const [cartAmount, setCartAmount] = useState(1);
  const toggleThumbSliderOpen = (thumbs) => {
    setThumbSliderOpen(!thumbSliderOpen);
  };
  const handleAddToCart = () => {
    const {
      _id,
      name,
      img,
      price: { current },
      review: { rating },
    } = productDetails;
    dispatch(
      addToCart({
        _id,
        name,
        img,
        current,
        rating,
        quantity: cartAmount,
      })
    );
  };
  const handleAddAmount = () => {
    setCartAmount(cartAmount + 1);
    console.log(cartAmount);
  };
  const handleSubstractAmount = () => {
    if (cartAmount > 1) {
      setCartAmount(cartAmount - 1);
      console.log(cartAmount);
    }
  };
  const { id } = useParams();

  useEffect(() => {
    //fetchProductDetails();
    dispatch(getProductDetails({ id }));
    dispatch(getProductReviews({ id }));
  }, [dispatch]);
  console.log(id);

  const routes = [
    { name: "Home", destintion: "/" },
    { name: "collections", destintion: "/collections" },
  ];
  return (
    <div className={classes.wrapper}>
      {thumbSliderOpen && (
        <ThumbsSlider
          thumbs={productDetails.thumbs}
          handleClose={toggleThumbSliderOpen}
        />
      )}
      {productDetails && (
        <div className={`${classes.product_details}`}>
          <div className={`${classes.product_thumbs}`}>
            <div className={classes.large_screen}>
              {productDetails.thumbs?.map((thumb) => {
                return (
                  <div className={classes.thumb_wrapper}>
                    <img
                      src={thumb}
                      alt="product thumbnail"
                      className={classes.thumb}
                    />
                  </div>
                );
              })}
            </div>
            <div className={classes.small_screen}>
              <img
                src={productDetails.thumbs[0]}
                alt="product thumbnail"
                className={classes.thumb}
              />
              <div
                className={classes.view_more}
                onClick={toggleThumbSliderOpen}
              >
                <span className={classes.text}>view more</span>
                <IoIosExpand className={classes.expand_icon} />
              </div>
            </div>
          </div>

          <div className={`col-2 ${classes.product_details_text}`}>
            <h3>{productDetails.name}</h3>
            <div className={classes.rating_wrapper}>
              <span>
                {productDetails.review.votes * 3} sales |{" "}
                {productDetails.review.votes} reviews
              </span>

              <ReactStars
                className={classes.rating}
                count={5}
                size={18}
                color="gray"
                a11y={true}
                edit={false}
                isHalf="true"
                value={productDetails.review.rating}
                activeColor="#e3c01c"
              />
            </div>
            <div className={classes.prices_wraper}>
              <div className={classes.current_price}>
                $ {productDetails.price.current}
              </div>
              {productDetails.price.old !== 0 && (
                <div className={classes.old_price}>
                  $ {productDetails.price.old}
                </div>
              )}
            </div>

            <div className={classes.detail_actions}>
              <CartAmount
                className={classes.quantity}
                amount={cartAmount}
                handleAddCart={handleAddAmount}
                handleSubstractCart={handleSubstractAmount}
              />

              <button
                className={classes.add_cart_btn}
                onClick={handleAddToCart}
              >
                Add to Cart <RiShoppingCartLine className={classes.cart_icon} />{" "}
              </button>
            </div>

            <Collapsible label={"Highlights"}>
              <div className={classes.product_metas}>
                <div
                  className={` ${classes.meta_wrapper} ${classes.available_wrapper} `}
                >
                  <span className={classes.meta_heading}>Availability:</span>
                  <span className={classes.meta_content}>
                    {productDetails.availability}
                  </span>
                </div>

                <div
                  className={`${classes.meta_wrapper} ${classes.sizes_wrapper}`}
                >
                  <span className={classes.meta_heading}>Product Sizes:</span>
                  <ul className={classes.meta_content}>
                    {productDetails.productSizes.map((size) => {
                      return <li key={size}>{size}</li>;
                    })}
                  </ul>
                </div>
                <div
                  className={`${classes.meta_wrapper} ${classes.promotions_wrapper}`}
                >
                  <span className={classes.meta_heading}>Brand:</span>
                  <span className={classes.meta_content}>
                    {productDetails.brand}
                  </span>
                </div>
              </div>
            </Collapsible>
            <Collapsible label={"description"} className={classes.product_desc}>
              <p>{productDetails.description}</p>
            </Collapsible>
          </div>
          {/*====================  Details text End ========================== */}

          {/*====================  REVIEWS & DEScription  =========================== */}

          {reviews && <ProductReviews />}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
