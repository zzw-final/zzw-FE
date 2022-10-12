import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { instance } from "../api/request";
import ChatListItem from "../components/chat/ChatListItem";
import LayoutPage from "../components/common/LayoutPage";

const ChatListPage = () => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await instance.get(`/api/chat`);
      if (result.data.success && result.data.erorr === undefined) {
        setChatList(result.data.data);
      }
    };
    getData();
  }, []);

  const deleteChatRoom = async (roomId) => {
    const result = await instance.delete(`/api/chat/member/${roomId}`);
    if (result.data.success && result.data.erorr === undefined) {
      setChatList((prev) =>
        prev.filter((listItem) => listItem.roomId !== roomId)
      );
    }
  };

  return (
    <LayoutPage>
      <ChatListContainer>
        <p>DM</p>
        <ChatList>
          {chatList.length !== 0 ? (
            chatList.map((listItem, idx) => (
              <ChatListItem
                listItem={listItem}
                key={idx}
                deleteChatRoom={deleteChatRoom}
              />
            ))
          ) : (
            <ListText>채팅 리스트가 없습니다.</ListText>
          )}
        </ChatList>
      </ChatListContainer>
    </LayoutPage>
  );
};

const ChatListContainer = styled.div`
  text-align: center;
  padding: 1rem;
  p {
    font-size: var(--font-medium-large);
    font-weight: var(--weight-semi-bold);
  }
`;

const ChatList = styled.div`
  padding: 1rem;
  text-align: left;
`;

const ListText = styled.p`
  padding-top: 2rem;
`;

export default ChatListPage;
