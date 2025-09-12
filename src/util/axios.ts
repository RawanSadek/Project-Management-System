import axios from "axios";

export const baseURL = `https://upskilling-egypt.com:3003/api/v1`;

export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// USERS_URLS

export const USERS_URLS = {
  LOGIN: `/Users/Login`,
  REGISTER: `/Users/Register`,
  FORGET_PASSWORD: `/Users/Reset/Request`,
  RESET_PASSWORD: `/Users/Reset`,
  VERIFYACCOUNT: `/Users/verify`,
  CHANGEPASSWORD: `/Users/ChangePassword`,
  GETUSERS: `/Users`,
  GET_USERS_COUNT: `/Users/count`,
  TOGGLE_USER: (id: number) => `/Users/${id}`,
  GET_USER_DETAILS: (id: number) => `/Users/${id}`,
};
// PROJECTS_URLS
export const PROJECTS_URLS = {
  GET_ALL_PROJECTS: `/Project`,
  GET_MANAGER_PROJECTS: `/Project/manager`,
  GET_EMPLOYEE_PROJECTS: `/Project/employee`,
  CREATE_PROJECTS: `/Project`,
  DELETE_PROJECTS: (id: number) => `/Project/${id}`,
  EDIT_PROJECTS_BY_MANGER: (id: number) => `/Project/${id}`,
  GET_PROJECT_DETAILS: (id: number) => `/Project/${id}`,
};
export const TASKS_URLS = {
  GET_PROJECT_TASKS_MANAGER: (pageSize: number, page: number) =>
    `/Task/manager?pageSize=${pageSize}&pageNumber=${page}`,
  GET_TASKS_COUNT: `/Task/count`,
  GET_EMPLOYEE_TASKS: `/Task?pageSize=50&pageNumber=1`,
  CREATE_TASKS: `/Task`,
  DELETE_TASKS: (id: number) => `/Task/${id}`,
  EDIT_TASKS_BY_MANAGER: (id: number) => `/Task/${id}`,
  EDIT_TASKS_BY_EMPLOYEE: (id: number) => `/Task/${id}/change-status`,
  GET_TASKS_DETAILS: (id: number) => `/Task/${id}`,
};
