import Taro from "@tarojs/taro";

const ToastUtils = {
  error: (msg) => {
    Taro.atMessage({message: msg, type: 'error'})
  }
}

export default ToastUtils
