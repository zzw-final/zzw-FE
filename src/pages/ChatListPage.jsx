import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { instance } from "../api/request";
import ChatListItem from "../components/chat/ChatListItem";

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

  return (
    <ChatListContainer>
      <p>DM</p>
      <ChatList>
        {chatList.length !== 0 ? (
          chatList.map((listItem, idx) => (
            <ChatListItem listItem={listItem} key={idx} />
          ))
        ) : (
          <ListText>채팅 리스트가 없습니다.</ListText>
        )}
      </ChatList>
    </ChatListContainer>
  );
};

const ChatListContainer = styled.div`
  text-align: center;
  padding: 1rem;
`;

const ChatList = styled.div`
  padding: 1rem;
  text-align: left;
`;

const ListText = styled.p`
  padding-top: 2rem;
`;

export default ChatListPage;
