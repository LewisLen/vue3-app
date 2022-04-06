import Axios from "axios";
import { ElMessage } from "element-plus";
import { showLoading, hideLoading } from "./loading";
import { baseURL } from "../assets/js/constant";

const axios = Axios.create({
  baseURL,
  timeout: 10 * 1000,
});

axios.interceptors.request.use(
  (config) => {
    // 判断是否需要loading图标
    const isHideLoading = config.headers.isHideLoading || "";
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
    setTimeout(() => {
      hideLoading();
    }, 3000);
    console.log("请求发生错误：", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("初始response---", response);
    hideLoading();
    const { statusText, status, data } = response || {};
    // 请求成功
    if (response && (statusText === "ok" || status === 200)) {
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
    console.log("请求响应错误", error);
    return Promise.reject(error);
  }
);

export default axios;
