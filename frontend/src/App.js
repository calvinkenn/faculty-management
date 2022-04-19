import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";
import Profile from "./user/pages/Profile";
import Auth from "./auth/pages/Auth";
import "./App.css";
import Admin from "./admin/pages/Admin";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // const login = useCallback(() => {
  //   setIsLoggedIn(true);
  //   setIsAdmin(true);
  // }, []);

  const loginAsAdmin = useCallback(() => {
    setIsLoggedIn(true);
    setIsAdmin(true);
  }, []);
  const loginAsUser = useCallback(() => {
    setIsLoggedIn(true);
    setIsAdmin(false);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    if (!isAdmin) {
      routes = (
        <Routes>
          <Route path="/:userID/profile" element={<Profile />} />
          <Route
            path="/"
            element={<Navigate to="/:userID/profile" replace />}
          />
        </Routes>
      );
    } else {
      routes = (
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:userID/profile" element={<Profile />} />
          <Route path="/" element={<Navigate to="/admin" replace />} />
        </Routes>
      );
    }
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
        loginAsUser: loginAsUser,
        loginAsAdmin: loginAsAdmin,
        logout: logout,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
};

export default App;
