import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  isAdmin: false,
  token : null,
  loginAsUser: () => {},
  loginAsAdmin: () => {},
  userId: null,
  login: () => {},
  logout: () => {},
});
