import React from "react";
import LayoutPage from "../components/common/LayoutPage";
import styled from "styled-components";
import { instance } from "../api/request";
import { useQuery } from "react-query";
import { options } from "../api/options";
import useInput from "../hooks/useInput";
import FindUser from "../components/chat/FindUser";
import Input from "../components/UI/Input";
import { fetchAllUser } from "../api/chatpage";

function UserFindPage() {
  const [searchInput, searchInputHandler] = useInput();

  const { data: serchUser, isLoading: loadingSerchUser } = useQuery(
    ["user"],
    () => fetchAllUser(),
    options.eternal
  );

  const searchNickname = serchUser?.filter((item) => item.nickname.includes(searchInput));

  return (
    <LayoutPage headerTitle="사용자 찾기" backBtnTypeArrow="true">
      <SearchBox>
        <Input placeholder=" 닉네임을 검색하세요." onChangeFn={searchInputHandler}></Input>
      </SearchBox>
      <ChatList>
        {searchNickname && searchNickname.length !== 0 ? (
          searchNickname?.map((user, idx) => <FindUser user={user} key={idx} />)
        ) : (
          <Notice>
            "{searchInput}"와(과)
            <br /> 일치하는 유저를 찾을 수 없습니다.😅{" "}
          </Notice>
        )}
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

const Notice = styled.div`
  text-align: center;
  margin: 10rem auto 10rem auto;
  font-size: var(--font-regular);
`;
