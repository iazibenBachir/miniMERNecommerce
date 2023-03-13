import React, { useEffect, useState } from "react";
import classes from "./FilterSidebar.module.scss";
import { GrClose } from "react-icons/gr";
import { setFilter } from "../../redux/features/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Collapsible from "../Collapsible/Collapsible";
import { sizes, colors, brands, productTypes } from "../../services/staticData";
const FilterSidebar = ({ handleClose }) => {
  const [visible, setVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.products.filter);

  const Styles = {
    transform: `translateX(${visible ? 0 : -50}px)`,
    opacity: `${visible ? 1 : 0}`,
    transition: "all ease-out 0.3s",
  };

  useEffect(() => {
    if (handleClose) {
      setTimeout(() => {
        setVisible(true);
      }, 50);
    } else {
      setVisible(false);
    }
  }, [visible, handleClose]);
  //============================ FORM HOOK
  // handle events
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      availability: [],
      gender: [],
      brand: [],
      productType: [],
      sizes: [],
      colors: [],
    },
  });
  // handle submit
  const onSubmit = (data) => {
    let filter = {};
    for (const key in data) {
      data[key].length && (filter[key] = data[key]);
    }
    Object.keys(filter).length === 0
      ? dispatch(setFilter(null))
      : dispatch(setFilter(filter));
    // let queryString = new URLSearchParams(filter).toString();
    setSearchParams(filter);
    // handleClose();
  };
  useEffect(() => {
    const subscription = watch(handleSubmit(onSubmit));
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  return (
    <div className={classes.modal}>
      <div className={classes.modal_content} style={Styles}>
        <div className={classes.modal_heading}>
          <div className={classes.close_icon_wrapper} onClick={handleClose}>
            <GrClose className={classes.close_icon}  />
          </div>
        </div>

        <div className={classes.filters_wrapper}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Collapsible label={"Availability"}>
              <div className={classes.filter_block}>
                <div>
                  <input
                    type="checkbox"
                    id="inStock"
                    value="in stock"
                    defaultChecked={filter?.availability?.includes("in stock")}
                    {...register("availability")}
                  />
                  <label htmlFor="inStock">In Stock</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="outOfStock"
                    value="out of stock"
                    defaultChecked={filter?.availability?.includes(
                      "out of stock"
                    )}
                    {...register("availability")}
                  />
                  <label htmlFor="outOfStock">Out Of Stock</label>
                </div>
              </div>
            </Collapsible>
            <Collapsible label={"Gender"}>
              <div className={classes.filter_block}>
                <div>
                  <input
                    type="checkbox"
                    id="men"
                    value="men"
                    defaultChecked={filter?.gender?.includes("men")}
                    {...register("gender")}
                  />
                  <label htmlFor="men">Men</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="women"
                    value="women"
                    {...register("gender")}
                    defaultChecked={filter?.gender?.includes("women")}
                  />
                  <label htmlFor="women">Women</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="kids"
                    value="kids"
                    {...register("gender")}
                    defaultChecked={filter?.gender?.includes("kids")}
                  />
                  <label htmlFor="kids">Kids</label>
                </div>
              </div>
            </Collapsible>
            <Collapsible label={"Brands"}>
              <div
                className={`${classes.filter_block} ${classes.brands_block}`}
              >
                {brands.map((item) => {
                  return (
                    <div key={item}>
                      <input
                        type="checkbox"
                        id={item}
                        value={item}
                        {...register("brand")}
                        defaultChecked={filter?.brand?.includes(item)}
                      />

                      <label htmlFor={item}>
                        <div className={classes.brand_label}>{item}</div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </Collapsible>
            <Collapsible label={"Product Type"}>
              <div
                className={`${classes.filter_block} ${classes.product_types_block}`}
              >
                {productTypes.map((item) => {
                  return (
                    <div key={item}>
                      <input
                        type="checkbox"
                        id={item}
                        value={item}
                        {...register("productType")}
                        defaultChecked={filter?.productType?.includes(item)}
                      />

                      <label htmlFor={item}>{item}</label>
                    </div>
                  );
                })}
              </div>
            </Collapsible>
            <Collapsible label={"Sizes"}>
              <div className={`${classes.filter_block} ${classes.sizes_block}`}>
                {sizes.map((item) => {
                  return (
                    <div key={item}>
                      <input
                        type="checkbox"
                        id={item}
                        value={item}
                        {...register("sizes")}
                        defaultChecked={filter?.sizes?.includes(item)}
                      />
                      <label htmlFor={item}>
                        <div className={classes.size_label}>{item}</div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </Collapsible>
            <Collapsible label={"Colors"}>
              <div
                className={`${classes.filter_block} ${classes.colors_block}`}
              >
                {colors.map((item) => {
                  return (
                    <div key={item}>
                      <input
                        type="checkbox"
                        id={item}
                        value={item}
                        {...register("colors")}
                        defaultChecked={filter?.colors?.includes(item)}
                      />
                      <label htmlFor={item}>
                        <div
                          className={classes.color_label}
                          style={{
                            background: `#${item}`,
                          }}
                        ></div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </Collapsible>
          </form>

          {/*=========================*/}
        </div>
      </div>
      <div className={classes.modal_empty_box} onClick={handleClose}></div>
    </div>
  );
};

export default FilterSidebar;
