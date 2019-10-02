import Taro from "@tarojs/taro";

import {observable} from 'mobx'
import {getConfig, recordLiveState} from "../utils/ApiUtils";

//同一时间只允许抓取一次状态
let fetchRecordLiveStateLock = false
let fetchConfigLock = false

const globalStore = observable({
  user: null,
  // serverUrl: 'http://localhost/php/videocontrol_back',
  // serverUrl: 'http://192.168.31.22/php/videocontrol_back',
  // serverUrl: 'http://192.168.1.223/videocontrol',
  // serverUrl: 'http://127.0.0.1/videocontrol',
  serverUrl: '/videocontrol',
  recordLiveState: null,
  config: null,
  fetchRecordLiveState: () => {
    if (!fetchRecordLiveStateLock && globalStore.user != null) {
      fetchRecordLiveStateLock = true
      recordLiveState().then((res) => {
        if (globalStore.user) {
          globalStore.recordLiveState = res.data.data
        }
      }).finally(() => {
        fetchRecordLiveStateLock = false
      })
    }
  },
  fetchConfig: () => {
    if (!fetchConfigLock && globalStore.user != null) {
      fetchConfigLock = true
      getConfig().then((res) => {
        if (globalStore.user) {
          globalStore.config = res.data.data
        }
      }).finally(() => {
        fetchConfigLock = false
      })
    }
  },
  logout: () => {
    Taro.removeStorageSync("user")
    Taro.removeStorageSync("loginTime")
    globalStore.user = null
    globalStore.recordLiveState = null
    globalStore.config = null
  },
  login: (user) => {
    globalStore.user = user
    globalStore.fetchRecordLiveState()
    globalStore.fetchConfig()
  }
})
export default globalStore
