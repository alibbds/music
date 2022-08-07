import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";

const request = axios.create({
  timeout: 6000,
  withCredentials: true,
  baseURL: "http://localhost:3000",
});
request.interceptors.request.use((config) => {
  nprogress.start();
  return config;
});
request.interceptors.response.use(
  (res) => {
    nprogress.done();
    return res.data;
  },
  (err) => {
    nprogress.done();
    console.log("err", err.response.data);
    return Promise.reject(err);
  }
);
export default request;
