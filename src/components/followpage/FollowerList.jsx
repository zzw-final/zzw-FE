import React from "react";
import Follow from "./Follow";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import Input from "../UI/Input";

function FollowerList({ followerList, mutate }) {
  const [searchInput, searchInputHandler] = useInput();

  if (followerList?.length === 0) {
    return <Div>팔로워 목록이 여기에 표시됩니다.</Div>;
  }

  const searchFollowerList = followerList?.filter((item) => item.nickname.includes(searchInput));

  return (
    <>
      <Input onChangeFn={searchInputHandler} />
      <div style={{ height: "auto", marginBottom: "100px" }}>
        {searchFollowerList?.map((follow) => (
          <Follow key={follow.userId} follow={follow} mutate={mutate} />
        ))}
      </div>
    </>
  );
}

export default FollowerList;

const Div = styled.div`
  color: var(--color-grey);
  margin-top: 5rem;
  text-align: center;
`;
