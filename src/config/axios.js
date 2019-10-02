/**
 * 请求框架
 */
import axios from "axios";
import ToastUtils from "../utils/ToastUtils";
import globalStore from "../store/globalStore";

//使用cookie
axios.defaults.withCredentials = true;

// 添加响应拦截器
axios.interceptors.response.use(res => {
    if (res.data.code === 0) {
      if (res.data.data === "请先登录") {
        globalStore.logout();
      } else {
        ToastUtils.error(res.data.data);
      }
    } else {
      return Promise.resolve(res);
    }
  },
  (error) => {
    // 全局拦截错误消息，显示错误信息
    if (error.message === "Network Error") {
      ToastUtils.error('录播主机无响应，请检查网络链接或重启设备')
    } else {
      ToastUtils.error(error.response.data.data)
      return Promise.reject(error);
    }
  });

