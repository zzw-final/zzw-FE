import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useState } from "react";
import { instance } from "../api/request";
import ChatListItem from "../components/chat/ChatListItem";
import LayoutPage from "../components/common/LayoutPage";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchChatList, fetchChatRoomDelete } from "../api/chatList";
import { options } from "../api/options";
import useInput from "../hooks/useInput";

const ChatListPage = () => {
  const { data: chatList } = useQuery(
    "chatList",
    fetchChatList,
    options.eternal
  );

  const queryClient = useQueryClient();

  const deleteChatRoom = async (roomId) => {
    return await fetchChatRoomDelete(roomId);
  };

  const MutateDeleteChatRoom = useMutation(deleteChatRoom, {
    onMutate: async (roomId) => {
      await queryClient.cancelQueries("chatList");
      const oldData = await queryClient.getQueryData("chatList");
      const tempData = queryClient.setQueryData(["chatList"], (prev) => {
        const temp = prev.data.data.filter((item) => item.roomId !== roomId);
        return temp;
      });

      return { oldData, tempData };
    },
    onError: (_, value, context) => {
      queryClient.setQueryData("chatList", context.oldData);
    },
    // onSuccess: (_, value, context) => {
    //   console.log("value", value);
    //   console.log("value ccc", context.tempData);
    //   queryClient.setQueryData(["chatList"], context.tempData);
    // },
    onSettled: () => {
      queryClient.invalidateQueries("chatList");
    },
  });

  const { mutate: deleteRoom } = MutateDeleteChatRoom;

  const onSubmit = (roomId) => {
    // MutateDeleteChatRoom.mutate(roomId);
    deleteRoom(roomId);
  };
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
          {searchNickname ? (
            searchNickname.map((listItem, idx) => (
              <ChatListItem listItem={listItem} key={idx} onSubmit={onSubmit} />
            ))
          ) : (
            <ListText>채팅 리스트가 없습니다.</ListText>
          )}
        </ChatList>
      </ChatListContainer>
    </LayoutPage>
  );
};

const ChatListContainer = styled.div``;

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
`;

export default ChatListPage;
