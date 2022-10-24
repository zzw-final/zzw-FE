import React from "react";
import LayoutPage from "../components/common/LayoutPage";
import styled from "styled-components";
import { instance } from "../api/request";
import { useQuery } from "react-query";
import { options } from "../api/options";
import useInput from "../hooks/useInput";
import FindUser from "../components/chat/FindUser";
import DevlopUser from "../components/chat/DevlopUser";
import Input from "../components/UI/Input";

function UserFindPage() {
  const [searchInput, searchInputHandler] = useInput();

  const fetchUser = async (nickname) => {
    return await instance.get(`/api/chat/member?nickname=${nickname}`);
  };

  const fetchDevlopUser = async () => {
    return await instance.get(`api/chat/member`);
  };
  const { data: serchUser, isLoading: loadingSerchUser } = useQuery(
    ["user", searchInput],
    () => fetchUser(searchInput),
    options.eternal
  );

  const { data: delopUser } = useQuery(
    ["devuser"],
    () => fetchDevlopUser(),
    options.eternal
  );

  const searchNickname = serchUser?.filter((item) =>
    item.nickname.includes(searchInput)
  );

  return (
    <LayoutPage headerTitle="사용자 찾기" backBtnTypeArrow="true">
      <SearchBox>
        <Input
          placeholder=" 닉네임을 검색하세요."
          onChangeFn={searchInputHandler}
        ></Input>
      </SearchBox>
      <ChatList>
        {searchNickname && searchNickname.length !== 0
          ? searchNickname?.map((user, idx) => (
              <FindUser user={user} key={idx} />
            ))
          : delopUser?.map((user, idx) => <DevlopUser user={user} key={idx} />)}
      </ChatList>
    </LayoutPage>
  );
}

export default UserFindPage;

const SearchBox = styled.div`
  margin-top: 1.3rem;
`;

const ChatList = styled.div`
  padding: 0rem 1rem;
  text-align: left;
  margin-bottom: 80px;
`;
