import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  isAdmin: false,
  token : null,
  userID : null,
  loginAsUser: () => {},
  loginAsAdmin: () => {},
  // login: () => {},
  logout: () => {},
});
