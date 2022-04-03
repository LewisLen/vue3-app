import Axios from "axios";
import { ElMessage } from "element-plus";

const baseURL = "http://localhost:3030/";

const axios = Axios.create({
  baseURL,
  timeout: 10 * 1000,
});

const tokenInfo = window.sessionStorage.getItem("__tokenInfo__") || "";

axios.interceptors.request.use(
  (config) => {
    if (tokenInfo) {
      config.headers.authorization = tokenInfo;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response && (response.statusText === "ok" || response.status === 200)) {
      if (response.data.returnCode === "000000") {
        return response.data || {};
      } else {
        ElMessage.error(response.data.message);
        return response.data || {};
      }
    } else {
      ElMessage.error("请求失败");
      return response;
    }
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status;
      const msg = error.response.data.message;
      ElMessage.error(`Code: ${code}, Message: ${msg}`);
      console.error(`[Axios Error]`, error.response);
    } else {
      ElMessage.error(`${error}`);
    }
    return Promise.reject(error);
  }
);

export default axios;
