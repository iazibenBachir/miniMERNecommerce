import classes from "./Cart.module.scss";
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowCart, removeCartItem } from "../../redux/features/cartSlice";
import { GrClose } from "react-icons/gr";

import { FiTrash2 } from "react-icons/fi";
import { BsMinecartLoaded } from "react-icons/bs";
import { useEffect } from "react";
import { useState } from "react";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const showCart = useSelector((state) => state.cart.showCart);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const handleRemoveItem = (itemId) => {
    dispatch(removeCartItem(itemId));
  };
  const handleCloseCart = () => {
    dispatch(toggleShowCart());
  };

  const totalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.current * item.quantity;
    });
    return total.toFixed(2);
  };
  const Styles = {
    transform: `translateX(${visible ? 0 : 50}px)`,
    opacity: `${visible ? 1 : 0}`,
    transition: "all ease-out 0.3s",
  };

  useEffect(() => {
    if (showCart) {
      setTimeout(() => {
        setVisible(true);
      }, 50);
    } else {
      setVisible(false);
    }
  }, [visible]);
  return (
    <div className={classes.modal}>
      <div className={classes.modal_empty_box} onClick={handleCloseCart}></div>
      <div className={classes.modal_content} style={Styles}>
        {cartItems.length ? (
          <div className={classes.cart_content}>
            <div>
              <div className={classes.cart_header}>
                <h2>Products in your cart</h2>
                <div
                  className={classes.close_icon_wrapper}
                  onClick={handleCloseCart}
                >
                  <GrClose className={classes.close_icon} />
                </div>
              </div>
              <div className={classes.items_wrapper}>
                {cartItems.map((item) => (
                  <div className={classes.item} key={item._id}>
                    <img src={item.img} alt="" />
                    <div className={classes.details}>
                      <h2>{item.name}</h2>
                      <ReactStars
                        className={classes.rating}
                        count={5}
                        size={15}
                        color="gray"
                        a11y={true}
                        edit={false}
                        isHalf="true"
                        value={item.rating}
                        activeColor="#e3c01c"
                      />
                      <div className={classes.price}>
                        <span className={classes.quantity}>
                          {`${item.quantity}X`}
                        </span>
                        <span>{` $${item.current}`}</span>
                      </div>
                    </div>
                    <FiTrash2
                      className={classes.delete_btn}
                      onClick={() => {
                        handleRemoveItem(item._id);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.cart_footer}>
              <span className={classes.more_dots}>...</span>
              <div className={classes.total}>
                <span>SUBTOTAL</span>
                <span>${totalPrice()}</span>
              </div>
              <button>PROCEED TO CHECKOUT</button>
              <div className={classes.view_cart}>View Cart</div>
            </div>
          </div>
        ) : (
          <div className={classes.cart_empty}>
            <BsMinecartLoaded className={classes.icon} />

            <h6>No Products in the Cart</h6>
          </div>
        )}
      </div>
    </div>
  );

  /*
  return (
    <div className={`${classes.wrapper}`} style={Styles}>
      {cartItems.length ? (
        <div className={classes.cart_content}>
          <div className={classes.cart_header}>
            <h2>Products in your cart</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
              className={`bi bi-x-lg ${classes.close_btn}`}
              onClick={handleCloseCart}
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </div>
          {cartItems.map((item) => (
            <div className={classes.item} key={item._id}>
              <img src={item.img} alt="" />
              <div className={classes.details}>
                <h2>{item.name}</h2>
                <ReactStars
                  className={classes.rating}
                  count={5}
                  size={15}
                  color="gray"
                  a11y={true}
                  edit={false}
                  isHalf="true"
                  value={item.rating}
                  activeColor="#e3c01c"
                />
                <div className={classes.price}>
                  <span className={classes.quantity}>
                    {`${item.quantity}X`}
                  </span>
                  <span>{` $${item.current}`}</span>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className={`bi bi-trash3 ${classes.delete_btn}`}
                viewBox="0 0 16 16"
                onClick={() => {
                  handleRemoveItem(item._id);
                }}
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
            </div>
          ))}
          <div className={classes.cart_footer}>
            <div className={classes.total}>
              <span>SUBTOTAL</span>
              <span>${totalPrice()}</span>
            </div>
            <button>PROCEED TO CHECKOUT</button>
            <div className={classes.view_cart}>View Cart</div>
          </div>
        </div>
      ) : (
        <div className={classes.cart_empty}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            viewBox="0 0 16 16"
            className={`bi bi-bag-fill ${classes.icon}`}
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
          </svg>
          <h6>No Products in the Cart</h6>
        </div>
      )}
    </div>
  );
  */
};

export default Cart;
