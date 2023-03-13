import React, { useEffect } from "react";
import classes from "./SearchProduct.module.scss";
import { useSearchParams } from "react-router-dom";
import { querySearchProducts } from "../../redux/features/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ProductCard from "../../components/ProductCard/ProductCard";

const SearchProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  let qEnteries = [...searchParams.entries()];
  const queryString = qEnteries
    .map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join("&");

  useEffect(() => {
    dispatch(querySearchProducts(queryString));
    console.log("@@@@@@@@@", queryString);
  }, [queryString]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        {loading ? (
          <LoadingSpinner />
        ) : products.length ? (
          <div className={classes.product_listings}>
            {products.map((product) => {
              return <ProductCard key={product._id} item={product} />;
            })}
          </div>
        ) : (
          <h1>NOt FOUND </h1>
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
