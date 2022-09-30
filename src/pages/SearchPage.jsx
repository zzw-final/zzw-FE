import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import List from "../components/common/List";
import SearchForm from "../components/main/SearchForm";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const SearchPage = () => {
  const [searchResultList, setSearchResultList] = useState([]);

  const [searchParams] = useSearchParams();
  const searchedTitle = searchParams.get("title");
  const searchedTag = searchParams.get("tag");
  const searchedNickname = searchParams.get("nickname");

  const navigate = useNavigate();

  const search = async (searchOption, sendData) => {
    console.log("들어와???");
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
    } else {
      search("nickname", searchedNickname);
    }
  }, [searchedTag, searchedTitle, searchedNickname]);

  const likeToggle = async (postId) => {
    return await instance.post(`/api/auth/post/${postId}`);
  };

  return (
    <LayoutPage background={"background.jpeg"}>
      <SearchForm searchPageSearch={search} />
      <SearchListBox>
        <List
          list={searchResultList}
          likeToggle={likeToggle}
          display="grid"
          height="210px"
          margin="0 0.5rem 0 0.5rem"
        />
      </SearchListBox>
    </LayoutPage>
  );
};

const SearchListBox = styled.section`
  background-color: var(--color-white);
  padding: 1rem 0;
  margin: 1rem 0;
  height: 100%;
`;

export default SearchPage;
