import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Button from "../UI/Button";

const ChatListItem = ({ listItem, deleteChatRoom }) => {
  const { roomId, userId, profile, nickname, grade, message, isRead } =
    listItem;

  console.log("listItem", listItem);

  const navigate = useNavigate();

  const chatPage = () => {
    navigate(`/chat/${roomId}`, {
      state: {
        nickname,
        grade,
      },
    });
  };

  const onDeleteChatRoom = (event) => {
    event.stopPropagation();
    if (
      window.confirm(
        "나가기를 누르면 채팅 데이터가 모두 삭제됩니다. 정말 나가시겠습니까?"
      )
    ) {
      deleteChatRoom(roomId);
    } else {
    }
  };
  // 안읽었으면 false,

  return (
    <ListItemContainer onClick={chatPage}>
      <Avatar
        alt="user_img"
        src={profile}
        sx={{ width: 48, height: 48, mr: 1 }}
      />
      <ItemContent>
        <Nickname>
          {nickname} / {grade} <IsReadAlert></IsReadAlert>
        </Nickname>
        {message}
      </ItemContent>
      <DeleteChatRoomBtn onClick={(e) => onDeleteChatRoom(e)}>
        X
      </DeleteChatRoomBtn>
    </ListItemContainer>
  );
};

const ListItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--color-orange);
  position: relative;
`;

const Nickname = styled.div`
  display: flex;
  align-items: center;
  font-weight: var(--weight-semi-bold);
  margin-bottom: 0.3rem;
`;

const IsReadAlert = styled.p`
  background-color: var(--color-orange);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 0.2rem;
`;

const ItemContent = styled.div`
  font-size: var(--font-small);
  color: var(--color-grey);
  width: 100%;
`;

const DeleteChatRoomBtn = styled.div`
  font-size: var(--font-small);
  position: absolute;
  top: 1rem;
  right: 0;
`;

export default ChatListItem;
