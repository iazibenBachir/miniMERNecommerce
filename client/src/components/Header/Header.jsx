import classes from "./Header.module.scss";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { RxDividerVertical } from "react-icons/rx";
import { RiShoppingBag3Line, RiMenu2Fill } from "react-icons/ri";

import { useSelector, useDispatch } from "react-redux";
import { toggleShowCart } from "../../redux/features/cartSlice";
import { toggleShowAuthModel } from "../../redux/features/authSlice";
import { brands } from "../../services/staticData";
import { useState } from "react";
import HeaderSidebar from "../HeaderSidebar/HeaderSidebar";

const Header = () => {
  const [headerSidebarOpen, setHeaderSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef();
  const searchBrandRef = useRef();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const toggleHeaderSidebarOpen = () => {
    setHeaderSidebarOpen(!headerSidebarOpen);
  };
 
  const toggleCartOpen = () => {
    dispatch(toggleShowCart());
  };
  const handleSearch = () => {
    const searchValue = searchRef.current.value;
    const searchBrandValue = searchBrandRef.current.value;
    console.log("====Search=>:", searchRef.current.value);
    navigate(`/search?q=${searchValue}&brand=${searchBrandValue}`);
  };

  return (
    <div className={classes.wrapper}>
      {headerSidebarOpen && (
        <HeaderSidebar handleClose={toggleHeaderSidebarOpen} />
      )}
      <header className={classes.container}>
        <div className={classes.header_top}>
          <button
            className={classes.menu_btn}
            onClick={toggleHeaderSidebarOpen}
          >
            <RiMenu2Fill className={classes.menu_icon} />
          </button>
          <div className={classes.logo_wrapper}>
            <Link to="/">
              <img
                className={classes.logo}
                src="https://template.hasthemes.com/martup-v1/p2/img/logo-dark-theme.png"
                alt="app logo"
              />
            </Link>
          </div>
          <div className={classes.header_search_widget}>
            <select
              name="brands"
              className={classes.brands_select}
              ref={searchBrandRef}
            >
              <option style={{ display: "none" }} value="all">
                Select Brand
              </option>
              {brands.map((brand) => {
                return (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                );
              })}
            </select>
            <RxDividerVertical className={classes.vertical_devider} />
            <input
              type="search"
              placeholder="Search for anything"
              name="search"
              ref={searchRef}
            />
            <RxDividerVertical className={classes.vertical_devider} />
            <button className={classes.search_btn} onClick={handleSearch}>
              <HiSearch className={classes.search_icon} />
            </button>
          </div>

          <div className={classes.header_widgets}>
            <div className={classes.header_auth}>
              {isLoggedIn ? (
                <span className={classes.auth}>{user.username}</span>
              ) : (
                <Link to="/auth">
                  <AiOutlineUser
                    className={classes.header_icon}
                    //onClick={toggleAuthModalOpen}
                  />
                </Link>
              )}
            </div>
            <RxDividerVertical className={`${classes.vertical_devider}`} />
            <div className={`${classes.header_cart} `} onClick={toggleCartOpen}>
              <RiShoppingBag3Line
                className={`${classes.cart_icon} ${classes.header_icon} `}
              />
              <div className={classes.cart_count_wrapper}>
                <span className={classes.cart_count}>
                  {cartItems.length || 0}{" "}
                </span>
                <span className={classes.cart_text}>ITEMS</span>
              </div>
            </div>
          </div>
        </div>
        {/* =================BOTTOM START========================      */}
      </header>
    </div>
  );
};

export default Header;
