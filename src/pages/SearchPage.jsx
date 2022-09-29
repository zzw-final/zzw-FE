import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  console.log("searchedTag > ", searchedTag);

  const search = async (searchOption, sendData) => {
    navigate(`/search?${searchOption}=${sendData}`);
    const requestUrl = `/api/post/filter/${searchOption}?${searchOption}=${sendData}`;
    const resultSearch = await instance.get(requestUrl);
    setSearchResultList(resultSearch.data.data);
  };

  useEffect(() => {
    if (searchedTag !== null) {
      search("tag", searchedTag);
    }
    if (searchedTitle !== null) {
      search("title", searchedTitle);
    }
    if (searchedNickname !== null) {
      search("nickname", searchedNickname);
    }
  }, [searchedTag, searchedTitle, searchedNickname]);

  const likeToggle = async (postId) => {
    return await instance.post(`/api/auth/post/${postId}`);
  };

  return (
    <LayoutPage background={"background.jpeg"}>
      <SearchForm search={search} />
      <RecommendText>{searchedTitle} 은 어떠세요?</RecommendText>
      <SearchListBox>
        <List
          list={searchResultList}
          likeToggle={likeToggle}
          display="grid"
          height="210px"
        />
      </SearchListBox>
    </LayoutPage>
  );
};

const SearchListBox = styled.section`
  background-color: var(--color-white);
  padding: 1rem 0;
  height: 100%;
`;
const RecommendText = styled.div`
  margin: 1rem 0;
  padding: 0.3rem 0;
  text-align: center;
`;

export default SearchPage;
