import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://localhost:8888/api',
})

// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("TOKEN");
//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// })
//
// axiosClient.interceptors.response.use((response) => {
//   return response;
// }, (error) => {
//   if (response.data.status === 401) {
//     localStorage.removeItem("TOKEN");
//   }
//   throw error;
// })

export default axiosClient;