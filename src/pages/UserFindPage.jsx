import React from "react";
import LayoutPage from "../components/common/LayoutPage";
import styled from "styled-components";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
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

  //   console.log(delopUser);

  const searchNickname = serchUser?.filter((item) =>
    item.nickname.includes(searchInput)
  );

  //   console.log(serchUser);

  return (
    <LayoutPage headerTitle="사용자 찾기" backBtnTypeArrow="true">
      <SearchBox>
        {/* <PersonSearchIcon /> */}
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
  margin: 1.4rem 1rem 1rem 1rem;
  width: 90%;
  height: 3.2rem;
  margin-bottom: 0.5rem;
  padding-top: 8px;
  padding-left: -2px;
  background-color: var(--color-white-orange);
  border: none;
  border-radius: 10px;
`;

const ChatList = styled.div`
  padding: 0rem 1rem;
  text-align: left;
  margin-bottom: 80px;
`;
