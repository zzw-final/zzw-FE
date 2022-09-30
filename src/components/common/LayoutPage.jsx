import React, { useEffect } from "react";
import Footer from "./Footer";
import styled from "styled-components";
import { instance } from "../../api/request";
import { useState } from "react";

const LayoutPage = ({ children, background }) => {
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
    <>
      <Wrapper background={background}>
        <div>{children}</div>
      </Wrapper>
      <Footer topTenTagList={topTenTagList} tagAllList={tagAllList} />
    </>
  );
};

const Wrapper = styled.div`
  height: auto;
  min-height: 100vh;
  padding-bottom: 56px;
  background-color: var(${({ background }) => background});
`;

export default LayoutPage;
