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

export interface UserTypes {
  id: number;
  country: string;
  creationDate: string;
  email: string;
  imagePath: string;
  modificationDate: string;
  phoneNumber: string;
  userName: string;
  isActivated: boolean;
  group: { 
    id: number,
    name: string,
    creationDate: string,
    modificationDate: string
  }
}

export interface UsersCountTypes{
  activatedEmployeeCount: number,
  deactivatedEmployeeCount: number
}
export interface ProjectTypes {
 id: number;
title: string;
isVerified:boolean;
isActivated: boolean;
description: string;
creationDate: string;
modificationDate: string;
}

export interface FormDataProject { 
  id?:number;
title: string;
description: string;
}

