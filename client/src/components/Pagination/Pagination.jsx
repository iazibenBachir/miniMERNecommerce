import React, { useEffect } from "react";
import classes from "./Pagination.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage,setPageToFiter } from "../../redux/features/productsSlice";
import { useSearchParams } from "react-router-dom";

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const total = useSelector((state) => state.products.total);
  const currentPage = useSelector((state) => state.products.currentPage);
  const limit = useSelector((state) => state.products.limit);
  const totalPages = Math.ceil(total / limit);
  useEffect(() => {
    console.log("PAGINATION====tot:=>", total);
  }, [total]);
  const setPage = (newPage) => {
    dispatch(setCurrentPage(newPage));
    dispatch(setPageToFiter(newPage));
    searchParams.set("page", `${newPage}`);
    setSearchParams(searchParams);
  };
  return (
    <div className={classes.wrapper}>
      {totalPages > 1 &&
        [...Array(totalPages)].map((val, index) => {
          return (
            <button
              key={index}
              className={currentPage === index + 1 ? classes.current : ""}
              onClick={() => {
                setPage(index + 1);
              }}
            >
              {index + 1}
            </button>
          );
        })}
    </div>
  );
};
export default Pagination;
