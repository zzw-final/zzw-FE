import React from "react";
import styled from "styled-components";
import ChatListItem from "../components/chat/ChatListItem";
import LayoutPage from "../components/common/LayoutPage";
import { useQuery } from "react-query";
import { fetchChatList } from "../api/chatList";
import { options } from "../api/options";
import useInput from "../hooks/useInput";

const ChatListPage = () => {
  const { data: chatList } = useQuery(
    "chatList",
    fetchChatList,
    options.nocache
  );
  const [searchInput, searchInputHandler] = useInput();

  const searchNickname = chatList?.filter((item) =>
    item.nickname.includes(searchInput)
  );

  return (
    <LayoutPage headerTitle="DM" backBtnTypeArrow="true">
      <ChatListContainer>
        <SearchBox>
          <Input
            placeholder=" 닉네임을 검색하세요."
            onChange={searchInputHandler}
          ></Input>
        </SearchBox>
        <ChatList>
          {searchNickname && searchNickname.length !== 0 ? (
            searchNickname.map((listItem, idx) => (
              <ChatListItem listItem={listItem} key={idx} />
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
  margin-bottom: 100px;
`;

const SearchBox = styled.div`
  text-align: center;
  position: relative;
  margin-top: 1.4rem;
`;

const Input = styled.input`
  width: 90%;
  height: 2.3rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
  background-color: var(--color-white-orange);
  border: none;
  border-radius: 10px;
  outline: none;
  font-weight: var(--weight-semi-bold);
  font-size: var(--font-small);
`;

const ChatList = styled.div`
  padding: 0rem 1rem;
  text-align: left;
`;

const ListText = styled.p`
  padding-top: 2rem;
  text-align: center;
  font-size: var(--font-medium);
`;

export default ChatListPage;
