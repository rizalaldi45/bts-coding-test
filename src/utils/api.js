import axios from "axios";

import { responseInterceptor, requestInterceptor } from "./AxiosIntercept";

const api = "http://94.74.86.174:8080/api";

if (typeof document !== "undefined") {
  responseInterceptor();
  requestInterceptor();
}

export async function registerUser(data) {
  return await axios({
    method: "POST",
    url: api + "/register",
    data,
  })
    .then((res) => res.data)
    .catch((err) => err.response);
}

export async function loginUser(data) {
  return await axios({
    method: "POST",
    url: api + "/login",
    data,
  })
    .then((res) => res.data)
    .catch((err) => err.response);
}

export async function getAllChecklist() {
  return await axios({
    method: "GET",
    url: api + "/checklist",
  })
    .then((res) => res.data)
    .catch((err) => err.response);
}

export async function addToDo(data) {
  return await axios({
    method: "POST",
    url: api + "/checklist",
    data,
  })
    .then((res) => res.data)
    .catch((err) => err.response);
}

export async function deleteToDo(todoId) {
  return await axios({
    method: "DELETE",
    url: api + `/checklist/${todoId}`,
  })
    .then((res) => res.data)
    .catch((err) => err.response);
}

export async function getSubToDo(todoId) {
  return await axios({
    method: "GET",
    url: api + `/checklist/${todoId}/item`,
  })
    .then((res) => res.data)
    .catch((err) => err.response);
}

export async function addSubToDo(todoId, data) {
  return await axios({
    method: "POST",
    url: api + `/checklist/${todoId}/item`,
    data,
  })
    .then((res) => res.data)
    .catch((err) => err.response);
}
