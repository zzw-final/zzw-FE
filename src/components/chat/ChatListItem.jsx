import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "../../util/dateFormat";

const ChatListItem = ({ listItem }) => {
  const { roomId, userId, chatTime, profile, nickname, grade, message, isRead } = listItem;

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

  console.log("chatTime :>> ", chatTime);

  return (
    <ListItemContainer onClick={chatPage}>
      <Avatar alt="user_img" src={profile} sx={{ width: 48, height: 48, mr: 1 }} />
      <ItemContent>
        <Nickname>
          {nickname}/{grade} {!isRead ? <IsReadAlert /> : ""}
          <ChatTime>{dateFormat(chatTime)}</ChatTime>
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
  border-bottom: 2px solid var(--color-main-light-orange);
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

const ChatTime = styled.p`
  color: var(--color-dark-white);
  font-size: var(--font-micro);
  position: absolute;
  right: 1rem;
`;

const ItemContent = styled.div`
  font-size: var(--font-small);
  color: var(--color-grey);
  width: 100%;
`;

export default ChatListItem;
