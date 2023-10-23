import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    console.log("Request URL:", config.url);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("Response Status Code:", response.status);
    console.log("Response Body:", response.data);

    return response;
  },
  (error) => {
    if (error.response) {
      console.log("Response Status Code:", error.response.status);
      console.log("Response Body:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default axios;
