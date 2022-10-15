import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSearchRecipe, likes, searchRecipe } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import List from "../components/common/List";
import SearchForm from "../components/main/SearchForm";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import Toast from "../components/UI/Toast";
import { useInfiniteQueryScroll } from "../hooks/useInfiniteQueryScroll";
import ListInfinite from "../components/common/ListInfinite";
import { options } from "../api/options";
import { useQuery } from "react-query";
import Recipe from "../components/posts/Recipe";

const SearchPage = () => {
  const [searchResultList, setSearchResultList] = useState([]);
  const [resultSearch, setResultSearch] = useState([]);
  const [searchLastPostId, setSearchLastPostId] = useState("");
  const [toast, setToast] = useState(false);

  const [searchParams] = useSearchParams();
  const searchedTitle = searchParams.get("title");
  const searchedTag = searchParams.get("tag");
  const searchedNickname = searchParams.get("nickname");

  const navigate = useNavigate();

  const search = async (searchOption, sendData) => {
    navigate(`/search?${searchOption}=${sendData}`);
    const requestUrl = `${searchOption}?${searchOption}=${sendData}`;
    const resultSearch = await fetchSearchRecipe(requestUrl);
    setResultSearch(requestUrl);
    setSearchResultList(resultSearch.data.data);
  };

  useEffect(() => {
    setSearchLastPostId(searchResultList[searchResultList?.length - 1]?.postId);
  }, [searchResultList]);

  const { ref, inView } = useInView();

  useEffect(() => {
    const isLast = searchResultList.length % 8 !== 0 ? true : false;
    if (inView && !isLast) {
      fetchSearchRecipe(resultSearch, searchLastPostId).then((res) =>
        setSearchResultList((prev) => [...prev, ...res?.data?.data])
      );
    }
  }, [inView, resultSearch, searchLastPostId, searchResultList.length]);

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
        {searchResultList?.length !== 0 ? (
          <ListContainer>
            {searchResultList &&
              searchResultList?.map((item, itemIdx) =>
                searchResultList?.length === itemIdx + 1 ? (
                  <div ref={ref} key={item.postId}>
                    <Recipe post={item} likeToggle={likeToggle} />
                  </div>
                ) : (
                  <Recipe
                    post={item}
                    key={item.postId}
                    likeToggle={likeToggle}
                  />
                )
              )}
          </ListContainer>
        ) : (
          <SearchListText>😅 검색 결과가 없습니다.</SearchListText>
        )}
      </SearchListBox>
    </LayoutPage>
  );
};

const ListContainer = styled.section`
  display: grid;
  height: 210px;
  margin: 0 0.5rem 0 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  grid-row-gap: 1rem;
  justify-items: center;
  margin: ${(props) => props.margin};
`;

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
