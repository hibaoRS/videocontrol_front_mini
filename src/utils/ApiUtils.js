import axios from "axios";
import globalStore from "../store/globalStore";

export function login(userInfo) {
  return axios.get(
    globalStore.serverUrl + "/manager.php",
    {params: {...userInfo, action: "login"}}
  )
}


export function logout() {
  return axios.get(
    globalStore.serverUrl + "/manager.php",
    {params: {action: "logout"}}
  )
}


export function startRecord() {
  return axios.get(
    globalStore.serverUrl + "/main.php",
    {params: {action: "startRecord", time: new Date().getTime()}}
  )
}

export function stopRecord() {
  return axios.get(
    globalStore.serverUrl + "/main.php",
    {params: {action: "stopRecord"}}
  )
}


export function startLive() {
  return axios.get(
    globalStore.serverUrl + "/main.php",
    {params: {action: "startLive", time: new Date().getTime()}}
  )
}

export function stopLive() {
  return axios.get(
    globalStore.serverUrl + "/main.php",
    {params: {action: "stopLive"}}
  )
}


export function remoteLive(remoteLiving) {
  return axios.get(globalStore.serverUrl + "/main.php", {params: {action: "setRemoteLiving", remoteLiving}})
}


export function setRecordName(name) {
  return axios.get(globalStore.serverUrl + "/main.php", {
    params: {
      action: "setRecordName",
      name
    }
  })
}


export function recordLiveState() {
  return axios.get(globalStore.serverUrl + "/system.php", {params: {action: "recordLiveState"}})
}

export function getConfig() {
  return axios.get(globalStore.serverUrl + "/main.php", {params: {action: "getConfig"}})
}


export function setSectionTime(time) {
  return axios.get(globalStore.serverUrl + "/main.php", {
    params: {
      action: "setSectionTime",
      sectionTime: time
    }
  })
}


export function setResourceMode(mode) {
  return axios.get(globalStore.serverUrl + "/main.php", {params: {action: "setResourceMode", resource_mode: mode}})
}
