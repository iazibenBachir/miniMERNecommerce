import React, { useState } from "react";
import classes from "./Home.module.scss";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import FilterBanner from "../../components/FilterBanner/FilterBanner";
import ProductCardSecond from "../../components/ProductCardSecond/ProductCardSecond";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
const Home = () => {
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const { products, loading } = useSelector((state) => state.products);

  const [displayMode, setDisplayMode] = useState("grid");

  const toggleFilterSidebarOpen = () => {
    setFilterSidebarOpen(!filterSidebarOpen);
  };
  const changeDisplayMode = (newModeState) => {
    setDisplayMode(newModeState);
  };
  return (
    <div className={classes.wrapper}>
      {filterSidebarOpen && (
        <FilterSidebar handleClose={toggleFilterSidebarOpen} />
      )}
      <FilterBanner
        toggleSidebarOpen={toggleFilterSidebarOpen}
        changeDisplayMode={changeDisplayMode}
        modeState={displayMode}
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div
          className={`${classes.product_listings} ${
            displayMode !== "grid" && classes.list
          }`}
        >
          {products?.map((item) => {
            return displayMode === "grid" ? (
              <ProductCard key={item._id} item={item} />
            ) : (
              <ProductCardSecond key={item._id} item={item} />
            );
          })}
        </div>
      )}
      <Pagination />
    </div>
  );
};

export default Home;
