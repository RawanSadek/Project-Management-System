import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import {Navigate} from "react-router-dom";
import type { AuthContextType, AuthProviderProps, loginDataTypes } from "../../types/types";

export let AuthContext = createContext<AuthContextType>({
  loginData: null,
  getLoginData: () => {},
  logout: () => {},
});

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [loginData, setLoginData] = useState<loginDataTypes | null>(() => {
    const token = localStorage.getItem("token");
    return token ? jwtDecode<loginDataTypes>(token) : null;
  });

  let getLoginData = () => {
    let encodedData = localStorage.getItem("token");
    if (!encodedData) return;
    let decodedData = jwtDecode<loginDataTypes>(encodedData);
    setLoginData(decodedData);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) getLoginData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setLoginData(null);
    <Navigate to="/login"/>;
  };

  return (
    <AuthContext.Provider value={{ loginData, getLoginData, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
