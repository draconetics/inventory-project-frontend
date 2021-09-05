import axios,  { AxiosInstance } from "axios";

export const http:AxiosInstance =  axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-type": "application/json"
  }
});
