import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  isAdmin: false,
  loginAsUser: () => {},
  loginAsAdmin: () => {},
  userId: null,
  login: () => {},
  logout: () => {},
});
