import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

const ChatListItem = ({ listItem }) => {
  const { roomId, userId, profile, nickname, grade, message, isRead } = listItem;

  const navigate = useNavigate();

  const chatPage = () => {
    navigate(`/chat/${roomId}`, {
      state: {
        nickname,
        grade,
        userId,
      },
    });
  };

  return (
    <ListItemContainer onClick={chatPage}>
      <Avatar alt="user_img" src={profile} sx={{ width: 48, height: 48, mr: 1 }} />
      <ItemContent>
        <Nickname>
          {nickname} / {grade} {!isRead ? <IsReadAlert /> : ""}
        </Nickname>
        {message}
      </ItemContent>
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
  width: 9px;
  height: 9px;
  border-radius: 50%;
  margin-left: 0.2rem;
`;

const ItemContent = styled.div`
  font-size: var(--font-small);
  color: var(--color-grey);
  width: 100%;
`;

export default ChatListItem;
