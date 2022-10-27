import React from "react";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../util/cookie";
import Button from "../UI/Button";
import { directMessage } from "../../api/userpage";

function FindUser({ user }) {
  const navigate = useNavigate();
  const cookies = getCookie("loginUserId");

  const DmRequest = async () => {
    const res = await directMessage(user?.userId);
    if (res.data.data) {
      navigate(`/chat/${res.data.data.roomId}`, {
        state: {
          nickname: user.nickname,
          grade: user.grade,
          userId: user.userId,
        },
      });
    }
  };

  const onClickGoToProfile = () => {
    if (+cookies === user?.userId) navigate(`/mypage`);
    else navigate(`/mypage/${user?.userId}`);
  };

  return (
    <Container>
      <LeftBox>
        <Avatar
          alt="user_img"
          src={user?.profile}
          sx={{ width: 48, height: 48, mr: 1 }}
          onClick={onClickGoToProfile}
        />
        <div>
          <Nickname onClick={onClickGoToProfile}>{user?.nickname}</Nickname>
          <Grade onClick={onClickGoToProfile}>{user?.grade}</Grade>
        </div>
        <BtnDiv>
          <Button onClick={DmRequest} name="FollowBtn" isFollow={false}>
            DM
          </Button>
        </BtnDiv>
      </LeftBox>
    </Container>
  );
}

export default FindUser;

const Container = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
`;

const Char = styled.img`
  width: 4rem;
  height: 4rem;
  background-color: #fbd499;
  border-radius: 50%;
  margin-right: 1rem;
`;

const Nickname = styled.div`
  width: auto;
  font-size: var(--font-medium);
  font-weight: var(--weight-bold);
`;

const Grade = styled.div`
  margin-top: 0.3rem;
  font-size: var(--font-small);
`;

const BtnDiv = styled.div`
  position: absolute;
  right: 10%;
`;
