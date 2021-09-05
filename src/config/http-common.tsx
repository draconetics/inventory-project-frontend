import axios,  { AxiosInstance } from "axios";

export const http:AxiosInstance =  axios.create({
  //baseURL: "http://localhost:4000",
  baseURL: "https://inventory-project-backend.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});
