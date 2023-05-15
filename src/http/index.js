import axios from "axios";

const API = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

API.interceptors.request.use((config) => {
  // config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJfaWQiOiI2NDU4ZDc0MWQzMDAwNGNhOWY0MTk2M2QiLCJpYXQiOjE2ODM1NjU1MjMsImV4cCI6MTY4NjE1NzUyM30.eQ3ZLB-EEDMPRngRHt21gIDmauakkO787z2_AdSXJQnSE`;
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  // config.headers.Authorization = "";
  return config;
});

export default API;
