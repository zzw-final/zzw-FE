import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TagSearch = ({ topTenTagList, tagAllList, setSlideIsOpen }) => {
  const [searchTagList, setSearchTagList] = useState([]);
  const [searchHelpText, setSearchHelpText] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchTagList.length !== 0 && searchTagList.length > 5) setSearchHelpText(true);
    else setSearchHelpText(false);
  }, [searchTagList]);

  const onClickTagHandler = () => {
    navigate(`/search?tag=${searchTagList.toString()}`);
  };

  const addSearchTag = (tagName) => {
    if (searchTagList.includes(tagName)) {
      setSearchTagList(searchTagList.filter((tag) => tag !== tagName));
    } else {
      setSearchTagList((prev) => [...prev, tagName]);
    }
  };

  const deleteSelectedTag = (deleteTagName) => {
    setSearchTagList(searchTagList.filter((tag) => tag !== deleteTagName));
  };
  return (
    <>
      <TagListFoldLine
        onClick={() => {
          setSlideIsOpen(false);
        }}
      />
      <SearchBoxTag>
        {searchTagList &&
          searchTagList?.map((tag, idx) => (
            <Tag
              tagName={tag}
              key={idx}
              margin="5px"
              isDelBtn={true}
              delBtnClick={() => {
                deleteSelectedTag(tag);
              }}
            />
          ))}
      </SearchBoxTag>
      {searchTagList.length !== 0 ? (
        <>
          <SearchBtn onClick={onClickTagHandler} disabled={searchHelpText}>
            검색
          </SearchBtn>
          {searchHelpText ? <SearchHelpText>최대 5개까지 선택 가능합니다.</SearchHelpText> : ""}
        </>
      ) : (
        <IntroText>냉장고 속 재료들을 선택해보세요 🥬</IntroText>
      )}
      <TagList>
        <TagTitle>인기 Tags ✨</TagTitle>
        <TagBox>
          {topTenTagList &&
            topTenTagList?.map((tag, idx) => (
              <Tag
                tagName={tag}
                key={idx}
                margin="6px"
                onClickHandler={() => {
                  addSearchTag(tag);
                }}
              />
            ))}
        </TagBox>
        <TagTitle>아래 태그도 검색해보세요 🧐</TagTitle>
        <TagBoxAll>
          {tagAllList &&
            tagAllList?.map((tag, idx) => (
              <Tag
                tagName={tag}
                key={idx}
                margin="6px"
                onClickHandler={() => {
                  addSearchTag(tag);
                }}
              />
            ))}
        </TagBoxAll>
      </TagList>
    </>
  );
};

const TagListFoldLine = styled.div`
  width: 20%;
  height: 0.2rem;
  background-color: var(--color-main-dark-orange);
  margin: 0.5rem auto 2rem auto;
`;

const IntroText = styled.div`
  font-size: var(--font-medium);
  font-weight: bold;
  margin: 2rem 0;
  z-index: 1;
`;

const SearchBoxTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  max-height: 10vh;

  ::-webkit-scrollbar {
    width: 0.3rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--color-orange);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--color-white);
  }
`;

const SearchBtn = styled.button`
  background-color: var(--color-main-dark-orange);
  border: 1px solid var(--color-white);
  width: 6rem;
  padding: 0.3rem;
  margin: 1rem auto 0 auto;
  font-size: var(--font-medium);
  color: var(--color-white);
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
`;

const SearchHelpText = styled.p`
  font-size: var(--font-small);
  color: var(--color-main-dark-orange);
  font-weight: bold;
  margin-top: 0.3rem;
`;

const TagList = styled.div``;

const TagTitle = styled.div`
  font-size: var(--font-medium);
  font-weight: bold;
  margin: 2rem 0 1rem 0;
`;

const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TagBoxAll = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default TagSearch;
