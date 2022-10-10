import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import List from "../components/common/List";
import SearchForm from "../components/main/SearchForm";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Toast from "../components/UI/Toast";

const SearchPage = () => {
  const [searchResultList, setSearchResultList] = useState([]);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const searchedTitle = searchParams.get("title");
  const searchedTag = searchParams.get("tag");
  const searchedNickname = searchParams.get("nickname");
  const [toast, setToast] = useState(false);

  // const location = useLocation();

  // if (location?.state) {
  //   console.log("location?.state.from :>> ", location.state.from);
  //   navigate(`/search?`);
  // }

  const search = async (searchOption, sendData) => {
    navigate(`/search?${searchOption}=${sendData}`);
    const requestUrl = `/api/post/filter/${searchOption}?${searchOption}=${sendData}`;
    const resultSearch = await instance.get(requestUrl);
    setSearchResultList(resultSearch.data.data);
  };

  useEffect(() => {
    if (searchedTag !== null) {
      search("tag", searchedTag);
    } else if (searchedTitle !== null) {
      search("title", searchedTitle);
    } else if (searchedNickname !== null) {
      search("nickname", searchedNickname);
    } else {
      throw new Error("검색할 수 없는 옵션입니다.");
    }
  }, [searchedTag, searchedTitle, searchedNickname]);

  const likeToggle = async (postId) => {
    return await instance.post(`/api/auth/post/${postId}`);
  };

  const showToast = () => {
    setToast(true);
  };

  return (
    <LayoutPage>
      <SearchBox>
        <SearchForm searchPageSearch={search} showToast={showToast} />
      </SearchBox>
      <SearchListBox>
        {toast && (
          <Toast
            setToast={setToast}
            text={"태그는 5개까지 검색 가능합니다."}
            margin="0.5rem"
          />
        )}
        {searchResultList.length !== 0 ? (
          <List
            list={searchResultList}
            likeToggle={likeToggle}
            display="grid"
            height="210px"
            margin="0 0.5rem 0 0.5rem"
          />
        ) : (
          <SearchListText>검색 결과가 없습니다. 😅</SearchListText>
        )}
      </SearchListBox>
    </LayoutPage>
  );
};

const SearchListBox = styled.section`
  background-color: var(--color-white);
  padding: 1rem 0;
  margin: 1rem 0;
  padding-bottom: 56px;
`;

const SearchBox = styled.div`
  background-color: var(--color-orange);
  padding: 1rem 0;
`;

const SearchListText = styled.p`
  font-size: var(--font-regular);
  color: var(--color-grey);
  text-align: center;
`;

export default SearchPage;
