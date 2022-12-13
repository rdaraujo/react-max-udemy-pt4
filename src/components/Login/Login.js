import React, { useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const EMPTY_STATE = {
  value: "",
  isValid: false,
};

const emailReducer = (prevState, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.val, isValid: emailValidateFunction(action.val) };
    case "INPUT_ONBLUR":
      return { value: prevState.value, isValid: emailValidateFunction(prevState.value) };
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const passwordReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: passwordValidateFunction(action.val) };
  } else if (action.type === "INPUT_ONBLUR") {
    return { value: prevState.value, isValid: passwordValidateFunction(prevState.value) };
  }
  return EMPTY_STATE;
};

const emailValidateFunction = email => {
  return email.includes("@");
};

const passwordValidateFunction = password => {
  return password.trim().length > 6;
};

const Login = props => {
  const [emailState, dispatchEmailAction] = useReducer(emailReducer, EMPTY_STATE);
  const [passwordState, dispatchPasswordAction] = useReducer(passwordReducer, EMPTY_STATE);

  const emailChangeHandler = event => {
    dispatchEmailAction({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = event => {
    dispatchPasswordAction({ type: "USER_INPUT", val: event.target.value });
  };

  const emailBlurHandler = () => {
    dispatchEmailAction({ type: "INPUT_ONBLUR" });
  };

  const passwordBlurHandler = () => {
    dispatchPasswordAction({ type: "INPUT_ONBLUR" });
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${emailState.isValid ? "" : classes.invalid}`}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
        </div>
        <div className={`${classes.control} ${passwordState.isValid ? "" : classes.invalid}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!emailState.isValid || !passwordState.isValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
