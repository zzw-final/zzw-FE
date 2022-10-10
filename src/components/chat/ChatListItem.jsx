import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ChatListItem = ({ listItem }) => {
  const { roomId, userId, profile, nickname, grade, message } = listItem;

  const navigate = useNavigate();

  const chatPage = () => {
    navigate(`/chat/${roomId}`, {
      state: {
        nickname,
        grade,
      },
    });
  };

  return (
    <ListItemContainer onClick={chatPage}>
      <Avatar
        alt="user_img"
        src={profile}
        sx={{ width: 38, height: 38, mr: 1 }}
      />
      <ItemContent>
        <Nickname>
          {nickname} / {grade}
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
`;

const Nickname = styled.div`
  font-size: var(--font-small);
  color: var(--color-black);
`;

const ItemContent = styled.div`
  font-size: var(--font-micro);
  color: var(--color-grey);
  width: 100%;
`;

export default ChatListItem;
