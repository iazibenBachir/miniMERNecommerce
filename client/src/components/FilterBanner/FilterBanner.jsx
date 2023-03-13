import React, { useEffect, useState } from "react";
import classes from "./FilterBanner.module.scss";
import { GrFormClose } from "react-icons/gr";
import { RxDividerVertical } from "react-icons/rx";
import { IoMdOptions } from "react-icons/io";

import {
  TfiLayoutGrid2Thumb,
  TfiLayoutGrid4Alt,
  TfiFilter,
} from "react-icons/tfi";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import { fetchProducts, sortAlphbit } from "../../redux/features/productsSlice";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/features/productsSlice";

const FilterBanner = ({ toggleSidebarOpen, changeDisplayMode, modeState }) => {
  const [filtersAsList, setFiltersList] = useState([]);
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filter);
  const total = useSelector((state) => state.products.total);
  const clearFilters = () => {
    dispatch(setFilter(null));
    setSearchParams("");
  };
  const removeFilterOption = (fOption) => {
    let newFilters = {};
    for (const key in filters) {
      if (filters[key].includes(fOption)) {
        let newArr = filters[key].filter((a) => {
          return a !== fOption;
        });
        if (newArr.length) {
          newFilters[key] = newArr;
        }
      } else {
        newFilters[key] = filters[key];
      }
    }
    console.log(newFilters);

    Object.keys(newFilters).length === 0
      ? dispatch(setFilter(null))
      : dispatch(setFilter(newFilters));

    setSearchParams(newFilters);
  };

  const getFiltersAsList = () => {
    if (filters) {
      let objvalues = filters && Object.values(filters);
      setFiltersList(objvalues.flat());
    }
  };
  const [sort, setSort] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  let qEnteries = [...searchParams.entries()];
  const queryString = qEnteries
    .map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join("&");
  //const filtersAsList = qEnteries.map((x) => encodeURIComponent(x[1]));
  const onSortChange = (event) => {
    setSort(event.target.value);
    console.log(event.target.value);
    dispatch(sortAlphbit(event.target.value));
  };
  useEffect(() => {
    dispatch(fetchProducts(queryString));
    getFiltersAsList();
    console.log("filters as list:", filtersAsList);
  }, [dispatch, queryString]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.top_section}>
        <div className={classes.display_mode_wrapper}>
          <div
            className={`${classes.mode} ${
              modeState === "grid" && classes.active
            }`}
            onClick={() => {
              changeDisplayMode("grid");
            }}
          >
            <CiGrid41 className={classes.display_mode_icon} />
          </div>
          <div
            className={`${classes.mode} ${
              modeState === "list" && classes.active
            }`}
            onClick={() => {
              changeDisplayMode("list");
            }}
          >
            <CiGrid2H className={classes.display_mode_icon} />
          </div>
        </div>
        <div className={classes.filter_options_wrapper}>
          <button
            className={classes.open_filter_btn}
            onClick={toggleSidebarOpen}
          >
            <IoMdOptions className={classes.filter_icon} />
            Filter
          </button>
          <select
            className={classes.select_sort}
            onChange={onSortChange}
            value={sort}
          >
            <option value="name asc">Name Ascending</option>
            <option value="name desc">Name Descending</option>
            <option value="price asc">price Ascending</option>
            <option value="price desc">price Descending</option>
            <option value="selling">best selling</option>
          </select>
        </div>
      </div>

      <div className={classes.bottom_section}>
        <div className={classes.products_found}>
          <span>{total}</span>Products Found{" "}
        </div>
        {filters &&
          filtersAsList?.map((fOption, index) => {
            return (
              <div key={fOption} className={classes.filter}>
                <RxDividerVertical className={classes.vertical_devider} />
                <GrFormClose
                  className={classes.remove_filter_icon}
                  onClick={() => {
                    removeFilterOption(fOption);
                  }}
                />

                <span>{fOption}</span>
                {filtersAsList.length === index + 1 && (
                  <RxDividerVertical className={classes.vertical_devider} />
                )}
              </div>
            );
          })}
        {filters && (
          <div className={classes.clear_filter} onClick={clearFilters}>
            <GrFormClose className={classes.remove_filter_icon} />
            <span>Clear</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBanner;
