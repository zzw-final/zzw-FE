import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { likes, searchRecipe } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import List from "../components/common/List";
import SearchForm from "../components/main/SearchForm";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Toast from "../components/UI/Toast";

const SearchPage = () => {
  const [searchResultList, setSearchResultList] = useState([]);
  const [toast, setToast] = useState(false);

  const [searchParams] = useSearchParams();
  const searchedTitle = searchParams.get("title");
  const searchedTag = searchParams.get("tag");
  const searchedNickname = searchParams.get("nickname");

  const navigate = useNavigate();

  const search = async (searchOption, sendData) => {
    navigate(`/search?${searchOption}=${sendData}`);
    const requestUrl = `${searchOption}?${searchOption}=${sendData}`;
    const resultSearch = await searchRecipe(requestUrl);
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
    likes(postId);
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
          <SearchListText>😅 검색 결과가 없습니다.</SearchListText>
        )}
      </SearchListBox>
    </LayoutPage>
  );
};

const SearchListBox = styled.section`
  background-color: var(--color-white);
  padding: 1rem 0;
  margin: 1rem 0;
  padding-bottom: 90px;
`;

const SearchBox = styled.div`
  background-color: var(--color-main-light-orange);
  padding: 1.6rem 0;
`;

const SearchListText = styled.p`
  font-size: var(--font-regular);
  color: var(--color-grey);
  text-align: center;
`;

export default SearchPage;
