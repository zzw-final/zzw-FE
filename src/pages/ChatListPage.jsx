import React from "react";
import styled from "styled-components";
import ChatListItem from "../components/chat/ChatListItem";
import LayoutPage from "../components/common/LayoutPage";
import { useQuery } from "react-query";
import { fetchChatList } from "../api/chatList";
import { options } from "../api/options";
import useInput from "../hooks/useInput";
import Input from "../components/UI/Input";
import Spinner from "../components/UI/Spinner";

const ChatListPage = () => {
  const { data: chatList, isLoading } = useQuery("chatList", fetchChatList, options.nocache);
  const [searchInput, searchInputHandler] = useInput();

  const searchNickname = chatList?.filter((item) => item.nickname.includes(searchInput));

  if (isLoading) return <Spinner />;

  return (
    <LayoutPage headerTitle="DM" backBtnTypeArrow="true" findUser="true">
      <ChatListContainer>
        <SearchBox>
          <Input onChangeFn={searchInputHandler} />
        </SearchBox>
        <ChatList>
          {searchNickname && searchNickname.length !== 0 ? (
            searchNickname.map((listItem, idx) => <ChatListItem listItem={listItem} key={idx} />)
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
