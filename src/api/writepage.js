import { useMutation } from "react-query";
import { instance } from "./request";

//detail
export const fetchDetail = async (id) => {
  return await instance.get(`/api/post/${id}`);
};

// export const fetchDelete = async (id) => {
//   return await instance.delete(`/api/auth/post/${id}`);
// };

export const fetchEdit = async (id) => {
  return await instance.put(`/api/auth/post/${id}`);
};
