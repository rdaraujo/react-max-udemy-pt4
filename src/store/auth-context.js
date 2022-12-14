import React, { useState, useEffect } from "react";

import { LOGGED_IN_FLAG } from "../Helpers/Constants";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem(LOGGED_IN_FLAG));
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem(LOGGED_IN_FLAG, true);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem(LOGGED_IN_FLAG);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
