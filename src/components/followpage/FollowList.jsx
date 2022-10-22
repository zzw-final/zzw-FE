import React from "react";
import Follow from "./Follow";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import Input from "../UI/Input";

function FollowList({ followList, mutate }) {
  const [searchInput, searchInputHandler] = useInput();

  if (followList?.length === 0) {
    return <Div>팔로우 목록이 여기에 표시됩니다.</Div>;
  }

  const searchFollowList = followList?.filter((item) => item.nickname.includes(searchInput));

  return (
    <>
      <Input onChangeFn={searchInputHandler} />
      {searchFollowList?.map((follow) => (
        <Follow key={follow.userId} follow={follow} mutate={mutate} />
      ))}
    </>
  );
}

export default FollowList;

const Div = styled.div`
  color: var(--color-grey);
  margin-top: 5rem;
  text-align: center;
`;
