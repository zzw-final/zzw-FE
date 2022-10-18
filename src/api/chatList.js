import { instance } from "./request.js";

export const fetchChatList = async () => {
  return await instance.get(`/api/chat`);
};

export const fetchChatRoomDelete = async (roomId) => {
  return await instance.delete(`/api/chat/member/${roomId}`);
};
