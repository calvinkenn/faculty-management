import React, { useState, useCallback, useEffect, useContext } from "react";
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
  const auth = useContext(AuthContext);
  const [token, setToken] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(false);

  // const login = useCallback(() => {
  //   setIsLoggedIn(true);
  //   setIsAdmin(true);
  // }, []);
  const loginAsAdmin = useCallback((token) => {
    setToken(true);
    setIsAdmin(true);
  }, []);
  const loginAsUser = useCallback((uid, token) => {
    setIsAdmin(false);
    setToken(token);
    sessionStorage.setItem('userData', JSON.stringify({userId: uid, token:token}));
    setUserId(uid);
  }, []);

  const login = useCallback((uid, token) => {
    setIsAdmin(false);
    setToken(token);
    sessionStorage.setItem('userData', JSON.stringify({userId: uid, token:token}));
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    sessionStorage.removeItem('userData');
  }, []);

  useEffect(()=>{
    const storedData = JSON.parse(sessionStorage.getItem('userData'));

    if(storedData && storedData.token){
      loginAsUser(storedData.userId, storedData.token);
    }
  }, [loginAsUser]);
  let routes;

  if (token) {
    if (!isAdmin) {
      routes = (
        <Routes>
          <Route path={`/profile/${userId}`} element={<Profile />} />
          <Route
            path="/"
            element={<Navigate to={`/profile/${userId}`} replace />}
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
        isLoggedIn: !!token,
        token: token,
        isAdmin: isAdmin,
        userId: userId,
        loginAsUser: loginAsUser,
        loginAsAdmin: loginAsAdmin,
        login: login,
        logout: logout,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
};

export default App;
