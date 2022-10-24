import React from "react";
import Tag from "./Tag";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TagSearch = ({ topTenTagList, tagAllList }) => {
  const navigate = useNavigate();

  const searchTag = (tag) => {
    navigate(`/search?tag=${tag}`);
  };

  return (
    <>
      <TagTitle>인기 Tags ✨</TagTitle>
      <TagBox>
        {topTenTagList &&
          topTenTagList?.map((tag, idx) => (
            <Tag
              tagName={tag}
              key={idx}
              margin="6px"
              onClickHandler={() => {
                searchTag(tag);
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
                searchTag(tag);
              }}
            />
          ))}
      </TagBoxAll>
    </>
  );
};

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
