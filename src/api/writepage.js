import { useMutation } from "react-query";
import { instance, imgInstance } from "./request";

//write

export const fetchpostWrite = async (data) => {
  return await instance.post(`/api/auth/post`, data);
};

//img
export const fetchImg = async (formdata) => {
  return await imgInstance.post("/api/post/image", formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

//detail
export const fetchDetail = async (id) => {
  return await instance.get(`/api/post/${id}`);
};

export const fetchDelete = async (id) => {
  return await instance.delete(`/api/auth/post/${id}`);
};

export const fetchEdit = async (sendData) => {
  return await instance.put(`/api/auth/post/${sendData.id}`, sendData.data);
};
