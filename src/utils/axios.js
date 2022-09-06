import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://assignment6videogallery.herokuapp.com/",
});

export default axiosInstance;
