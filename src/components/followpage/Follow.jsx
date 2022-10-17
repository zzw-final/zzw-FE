import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../UI/Button";
import { getCookie } from "../../util/cookie";

function Follow({ follow, mutate }) {
  const { profile, nickname, grade, isFollow, userId } = follow;
  const [greyButton, setGreyButton] = useState(isFollow);
  const navigate = useNavigate();
  const cookies = getCookie("loginUserId");

  const followHandler = async () => {
    setGreyButton((prev) => !prev);
    return await mutate(userId);
  };

  const onClickGoToProfile = () => {
    if (+cookies === userId) navigate(`/mypage`);
    else navigate(`/mypage/${userId}`);
  };

  return (
    <Container>
      <LeftBox onClick={onClickGoToProfile}>
        <Char src={profile}></Char>
        <div>
          <Nickname>{nickname}</Nickname>
          <Grade>{grade}</Grade>
        </div>
      </LeftBox>
      {!getCookie("loginUserId")
        ? null
        : userId !== +getCookie("loginUserId") && (
            <RightBox>
              <div>
                <Button onClick={followHandler} name="FollowBtn" isFollow={greyButton}>
                  {greyButton ? "팔로잉" : "팔로우"}
                </Button>
              </div>
            </RightBox>
          )}
    </Container>
  );
}

export default Follow;

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

const RightBox = styled.div`
  display: flex;
`;

const Nickname = styled.div`
  font-size: var(--font-medium);
  font-weight: var(--weight-bold);
`;

const Grade = styled.div`
  margin-top: 0.3rem;
  font-size: var(--font-small);
`;
