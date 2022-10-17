import React from "react";
import Follow from "./Follow";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import SearchIcon from "@mui/icons-material/Search";

function FollowList({ followList, mutate }) {
  const [searchInput, searchInputHandler] = useInput();

  if (followList?.length === 0) {
    return <Div>팔로우 목록이 여기에 표시됩니다.</Div>;
  }

  const searchFollowList = followList?.filter((item) =>
    item.nickname.includes(searchInput)
  );

  return (
    <>
      <SearchBox>
        <span>
          <SearchIcon color="warning" />
        </span>
        <Input
          type="search"
          placeholder="닉네임을 검색하세요."
          onChange={searchInputHandler}
        ></Input>
      </SearchBox>
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

const SearchBox = styled.div`
  text-align: center;
  position: relative;
  span {
    position: absolute;
    top: 7px;
    left: 7.5%;
  }
`;

const Input = styled.input`
  width: 90%;
  height: 2.3rem;
  margin-bottom: 0.3rem;
  padding: 1rem 0 1rem 2.7rem;
  background-color: var(--color-white-orange);
  border: none;
  border-radius: 10px;
  outline: none;
  caret-color: lightgray;
  font-weight: var(--weight-semi-bold);
  font-size: var(--font-small);

  &::placeholder {
    color: #777777;
    font-size: var(--font-semi-small);
    font-weight: var(--weight-regular-thick);
  }
  &::-webkit-search-decoration,
  &::--search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;
