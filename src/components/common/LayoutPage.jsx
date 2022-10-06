import React, { useEffect } from "react";
import Footer from "./Footer";
import styled from "styled-components";
import { instance } from "../../api/request";
import { useState } from "react";

const LayoutPage = ({ children, background, backgroundMain }) => {
  const [topTenTagList, setTopTenTagList] = useState();
  const [tagAllList, setTagAllList] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await instance.get(`/api/post/filter`);
      if (result.data.success && result.data.error === null) {
        const tagNameList = result.data.data.map((item) => item.tagName);
        setTopTenTagList(tagNameList.slice(0, 30));
        setTagAllList(tagNameList.slice(31));
      }
    }
    fetchData();
  }, []);

  return (
    <LayoutPageContainer>
      <Wrapper background={background} backgroundMain={backgroundMain}>
        <div>{children}</div>
      </Wrapper>
      <Footer topTenTagList={topTenTagList} tagAllList={tagAllList} />
    </LayoutPageContainer>
  );
};

const LayoutPageContainer = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  /* height: auto; */
  width: 100%;
  height: 100%;
  /* padding-bottom: 56px; */
  background-color: ${({ background }) => background || "white"};
  background: linear-gradient(
    var(${({ backgroundMain }) => backgroundMain}) 50%,
    var(--color-white) 50%
  );
`;

export default LayoutPage;
