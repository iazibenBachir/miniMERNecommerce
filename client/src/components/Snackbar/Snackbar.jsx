import { useEffect } from "react";
import classes from "./Snackbar.module.scss";
import { clearSnackbar } from "../../redux/features/snackbarSlice";
import { useSelector, useDispatch } from "react-redux";
const Snackbar = () => {
  //const {  dispatchSnackbar, isDisplayed, snackbarMessage } = useSnackbarContext();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.snackbar.message);
  const isDisplayed = useSelector((state) => state.snackbar.isDisplayed);
  let TIMER;
  const handleClose = () => {
    TIMER = setTimeout(() => {
      dispatch(clearSnackbar());
    }, 3000);
  };
  useEffect(() => {
    if (isDisplayed) {
      handleClose();
    }
    return () => {
      clearTimeout(TIMER);
    };
  }, [isDisplayed, TIMER]);
  return (
    <div className={`${classes.snackbar} ${isDisplayed && classes.active}`}>
      <div className={classes.snackbar_msg}>{message}</div>
    </div>
  );
};

export default Snackbar;
