import React from "react";
import LayoutPage from "../components/common/LayoutPage";
import styled from "styled-components";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { instance } from "../api/request";
import { useQuery } from "react-query";
import { options } from "../api/options";
import useInput from "../hooks/useInput";
import FindUser from "../components/chat/FindUser";

function UserFindPage() {
  const [searchInput, searchInputHandler] = useInput();

  const fetchUser = async (nickname) => {
    return await instance.get(`/api/chat/member?nickname=${nickname}`);
  };
  const { data: serchUser, isLoading: loadingSerchUser } = useQuery(
    ["user", searchInput],
    () => fetchUser(searchInput),
    options.eternal
  );
  const searchNickname = serchUser?.filter((item) =>
    item.nickname.includes(searchInput)
  );

  console.log(serchUser);

  return (
    <LayoutPage headerTitle="사용자 찾기" backBtnTypeArrow="true">
      <SearchBox>
        <PersonSearchIcon />
        <Input
          placeholder=" 닉네임을 검색하세요."
          onChange={searchInputHandler}
        ></Input>
      </SearchBox>
      <ChatList>
        {searchNickname && searchNickname.length !== 0 ? (
          searchNickname?.map((user, idx) => <FindUser user={user} key={idx} />)
        ) : (
          <div>채팅 리스트가 없습니다.</div>
        )}
      </ChatList>
      {/* <FindUser serchUser={serchUser} /> */}
    </LayoutPage>
  );
}

export default UserFindPage;

const SearchBox = styled.div`
  text-align: left;
  display: flex;
  margin: 1.4rem 1rem 1rem 1rem;
  width: 90%;
  height: 3.2rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
  background-color: var(--color-white-orange);
  border: none;
  border-radius: 10px;
`;

const Input = styled.input`
  border: none;
  margin-left: 10px;
  background-color: transparent;
  width: 90%;
  height: 1.5rem;
  outline: none;
  font-weight: var(--weight-semi-bold);
  font-size: var(--font-small);
`;

const ChatList = styled.div`
  padding: 0rem 1rem;
  text-align: left;
  margin-bottom: 80px;
`;
