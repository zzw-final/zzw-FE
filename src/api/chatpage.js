import { instance } from "./request";

export const fetchChat = async (roomId) => {
  return await instance.get(`/api/chat/message/${roomId}`);
};

export const read = async (newdata) => {
  return await instance.put("/api/chat/newmessage", newdata);
};

export const fetchUser = async (nickname) => {
  return await instance.get(`/api/chat/member?nickname=${nickname}`);
};
