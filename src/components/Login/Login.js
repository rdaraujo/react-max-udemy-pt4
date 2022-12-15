import React, { useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

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

const Login = () => {
  const [emailState, dispatchEmailAction] = useReducer(emailReducer, EMPTY_STATE);
  const [passwordState, dispatchPasswordAction] = useReducer(passwordReducer, EMPTY_STATE);

  const ctx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

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
    if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else if (!passwordState.isValid) {
      passwordInputRef.current.focus();
    } else {
      ctx.onLogin(emailState.value, passwordState.value);
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          ref={emailInputRef}
          label="E-mail"
          type="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        <Input
          id="password"
          ref={passwordInputRef}
          label="Password"
          type="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
