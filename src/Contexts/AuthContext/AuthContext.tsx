import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { AuthContextType, AuthProviderProps } from "../../types/types";

export let AuthContext = createContext<AuthContextType>({
  loginData: null,
  getLoginData: () => {},
  logout: () => {},
});

export function AuthContextProvider({ children }: AuthProviderProps) {

  let [loginData, setLoginData] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? jwtDecode(token) : null;
  });

  let getLoginData = () => {
    let encodedData = localStorage.getItem('token');
    if (!encodedData) return;
    let decodedData = jwtDecode(encodedData);
    setLoginData(decodedData);
  }

  useEffect(() => {
    if (localStorage.getItem('token'))
      getLoginData();
  }, [])

  const logout = () => {
    localStorage.removeItem('token');
    setLoginData(null);
    <Navigate to='/login' />
  }

  return <AuthContext.Provider value={{ loginData, getLoginData, logout }}>{children}</AuthContext.Provider>
}