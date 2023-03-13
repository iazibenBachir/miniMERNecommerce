import React, { useEffect, useRef, useState } from "react";
import classes from "./Auth.module.scss";
import { GrClose } from "react-icons/gr";

import { useSelector, useDispatch } from "react-redux";
import {
  login,
  register,
  removeAuthError,
} from "../../redux/features/authSlice";
const Auth = () => {
  const dispatch = useDispatch();
  const {  error } = useSelector((state) => state.auth);
  const [auth, setAuth] = useState("login");
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const [keepSignedin, setKeepSignedin] = useState(false);
  const togglecheckbox = () => {
    setKeepSignedin(!keepSignedin);
  };
  useEffect(() => {
    console.log("===========++++++");
    error &&
      setTimeout(() => {
        dispatch(removeAuthError());
        console.log("===========-----");
      }, 10000);
  }, [error,dispatch]);
  
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    dispatch(login({ email, password }));
    
  };
  const handleSignup = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = usernameRef.current.value;
    dispatch(register({ email, password, username }));
  };
  return (
    <div className={classes.wrapper}>
      {error && (
        <div className={classes.error_wrapper}>
          <span>{error}</span>
          <GrClose
            className={classes.close_error}
            onClick={() => {
              dispatch(removeAuthError());
            }}
          />
        </div>
      )}
      {auth === "login" ? (
        <div className={`${classes.auth} ${classes.login_auth}`}>
          <div className={classes.box_heading}>
            <h4>LOGIN</h4>
          </div>
          <form
            className={`${classes.auth_form} ${classes.login_form}`}
            onSubmit={handleLogin}
          >
            <div className={classes.form_group}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="enter your email"
                name="email"
                required
                ref={emailRef}
              />
            </div>

            <div className={classes.form_group}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="enter your password"
                name="password"
                required
                ref={passwordRef}
              />
            </div>
            <div className={classes.keep_signedin}>
              <input
                type="checkbox"
                name="keepSignedin"
                onChange={togglecheckbox}
              />
              <label htmlFor="keepSignedin">Stay signed in</label>
            </div>

            <button type="submit">Login</button>
          </form>
          <div className={classes.switch_auth}>
            Don't have an acount?{" "}
            <span
              onClick={() => {
                setAuth("register");
              }}
            >
              creat Acount
            </span>
          </div>
        </div>
      ) : (
        <div className={`${classes.auth} ${classes.signup_auth}`}>
          <div className={classes.box_heading}>
            <h4>Signup</h4>
          </div>
          <form
            className={`${classes.auth_form} ${classes.signup_form}`}
            onSubmit={handleSignup}
          >
            <div className={classes.form_group}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="enter your email"
                name="email"
                required
                ref={emailRef}
              />
            </div>
            <div className={classes.form_group}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="enter your password"
                name="password"
                required
                ref={passwordRef}
              />
            </div>
            <div className={classes.form_group}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="enter username"
                name="username"
                required
                ref={usernameRef}
              />
            </div>

            <div className={classes.keep_signedin}>
              <input
                type="checkbox"
                name="keepSignedin"
                onChange={togglecheckbox}
              />
              <label htmlFor="keepSignedin">Stay signed in</label>
            </div>

            <button type="submit">Signup</button>
          </form>
          <div className={classes.switch_auth}>
            already have an account?{" "}
            <span
              onClick={() => {
                setAuth("login");
              }}
            >
              Login
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
