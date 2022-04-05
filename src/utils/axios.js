import Axios from "axios";
import { ElMessage } from "element-plus";
import { showLoading, hideLoading } from "./loading";

const baseURL = "http://localhost:3030/";

const axios = Axios.create({
  baseURL,
  timeout: 10 * 1000,
});

axios.interceptors.request.use(
  (config) => {
    // 判断是否需要loading图标
    const isHideLoading = config.headers.isHideLoading || "";
    console.log("isHideLoading---", isHideLoading);
    if (!isHideLoading) {
      showLoading();
    }
    // 设置token信息
    const tokenInfo = sessionStorage.getItem("__tokenInfo__") || "";
    if (tokenInfo) {
      config.headers.authorization = tokenInfo;
    } else {
      config.headers.authorization = "";
    }
    return config;
  },
  (error) => {
    ElMessage.error("请求发生错误");
    console.log("error", error);
    setTimeout(() => {
      hideLoading();
    }, 3000);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("初始response---", response);
    hideLoading();
    const { statusText, status, data } = response || {};
    if (response && (statusText === "ok" || status === 200)) {
      // 请求成功
      if (data.returnCode === "000000") {
        return data || {};
      } else if (data.returnCode === "000996") {
        console.log("登录状态超时重定向登录页");
      } else {
        ElMessage.error(data.message);
        return data || {};
      }
    } else {
      // 请求响应错误
      console.log("请求响应错误", response);
      ElMessage.error("请求响应错误");
      return response;
    }
  },
  (error) => {
    setTimeout(() => {
      hideLoading();
    }, 3000);
    console.log(error);
    if (error.response && error.response.data) {
      const code = error.response.status;
      const msg = error.response.data.message;
      ElMessage.error(`Code: ${code}, Message: ${msg}`);
    } else {
      ElMessage.error(`错误信息：${error}`);
    }
    return Promise.reject(error);
  }
);

export default axios;
