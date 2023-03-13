import React, { useState } from "react";
import classes from "./CartAmount.module.scss";
import { GrAdd, GrSubtract } from "react-icons/gr";
const CartAmount = ({ amount, handleAddCart, handleSubstractCart }) => {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div className={classes.wrapper}>
      <GrSubtract className={classes.icon} onClick={handleSubstractCart} />
      {focused ? (
        <input
          type="text"
          defaultValue={amount}
          onFocus={onFocus}
          onBlur={onBlur}
          className={classes.amount_holder}
        />
      ) : (
        <span onClick={onFocus} className={classes.amount_holder}>
          {amount}
        </span>
      )}
      <GrAdd className={classes.icon} onClick={handleAddCart} />
    </div>
  );
};

export default CartAmount;
