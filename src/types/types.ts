import type { JwtPayload } from "jwt-decode";
import type { ReactNode } from "react";

export interface loginDataTypes{
    email: string,
    password: string
}

export interface AuthContextType {
  loginData: JwtPayload | null;
  getLoginData: () => void;
  logout: () => void;
};

export interface AuthProviderProps {
  children: ReactNode;
};

export interface changePassDataTypes{
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
}
export interface forgetPassDataTypes{
    email: string,
}


export interface resetPassDataTypes{
    email: string,
  password: string,
  confirmPassword: string,
  seed: string
}