import type { ReactNode } from "react";

export interface loginDataTypes {
  email: string;
  password: string;
}

export interface AuthContextType {
  loginData: loginDataTypes | null;
  getLoginData: () => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface changePassDataTypes {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
export interface RegisterTypes {
  userName: string;
  email: string;
  country: string;
  profileImage?: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}
export interface VerifyAccountTypes {
  email: string;
  code: string;
}
export interface resetPassDataTypes {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}
export interface forgetPassDataTypes {
  email: string;
}

export interface loginDataTypes {
  exp: number;
  iat: number;
  roles: string[];
  userEmail: string;
  userGroup: string;
  userId: number;
  userName: string;
  profilePicture?: string;
}