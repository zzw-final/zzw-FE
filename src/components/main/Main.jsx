import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { getMainData } from "../../api/request";
import Tag from "../common/Tag";
import RecipeBest from "../posts/RecipeBest";

const Main = () => {
  const [bestPost, setBestPost] = useState();
  const [recentPost, setRecentPost] = useState();
  const [tagList, setTagList] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await getMainData();
      if (result.data.success && result.data.error === null) {
        setBestPost(result.data.data.bestPost);
        setRecentPost(result.data.data.recentPost);
        setTagList(result.data.data.tagList);
      }
    }
    fetchData();
  }, []);

  return (
    <MainContainer>
      <TagsContainer>
        {tagList?.map((tag, idx) => (
          <Tag tagName={tag.tagName} key={idx} />
        ))}
      </TagsContainer>
      <BestRecipeContainer>
        <div>베스트 👍</div>
        <BestRecipeList>
          {bestPost?.map((post) => (
            <RecipeBest post={post} key={post.postId} />
          ))}
        </BestRecipeList>
      </BestRecipeContainer>
      <NewRecipeContainer>
        <div>new 레시피 👍</div>
        <RecentRecipeList>
          {recentPost?.map((post) => (
            <RecipeBest post={post} key={post.postId} />
          ))}
        </RecentRecipeList>
      </NewRecipeContainer>
    </MainContainer>
  ); // 태그, 베스트, 최신, 팔로우 목록 모두 가져옴.
};

const MainContainer = styled.div`
  padding: 0 5px;
`;

const TagsContainer = styled.section`
  display: flex;
`;

const BestRecipeContainer = styled.section`
  overflow-y: scroll;
`;

const BestRecipeList = styled.section`
  display: flex;
  height: 240px;
`;

const NewRecipeContainer = styled.section`
  overflow-y: scroll;
`;

const RecentRecipeList = styled.section`
  display: flex;
  height: 240px;
`;

export default Main;
