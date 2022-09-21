import React from "react";
import styled from "styled-components";

function Post() {
  return (
    <Container>
      <PostBox>
        <TopBox>
          <div style={{ fontSize: `var(--font-small)` }}>#쌀국수</div>
          {/* TODO: 더블클릭시 좋아요 되게 */}
          <div style={{ fontSize: `11px` }}>🥄13</div>
        </TopBox>
        <img
          alt="foodphoto"
          width="100%"
          height="60%"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS0FgEhG5IkCIal5KX2oQowhJlaL9OfxSRQw&usqp=CAU"
        />
        <Title>국물맛이 일품! 쌀국수</Title>
        <Tags>
          <Tag>#양지</Tag>
          <Tag>#숙주나물</Tag>
          <Tag>#레몬</Tag>
        </Tags>
      </PostBox>
      {/* DESC: 아래 부분은 나중엔 없어질 데이터 */}
      <PostBox>
        <TopBox>
          <div style={{ fontSize: `var(--font-small)` }}>#순두부찌개</div>
          <div style={{ fontSize: `11px` }}>🥄13</div>
        </TopBox>
        <img
          alt="foodphoto"
          width="100%"
          height="60%"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxmD2RH4ufh-eQQinAG4o5S7Ot7oSWkz0zeA&usqp=CAU"
        />
        <Title>계란이 들어간 순두부찌개</Title>
        <Tags>
          <Tag>#순두부</Tag>
          <Tag>#계란</Tag>
          <Tag>#바지락육수</Tag>
          <Tag>#파</Tag>
          <Tag>#청양고추</Tag>
        </Tags>
      </PostBox>
    </Container>
  );
}

export default Post;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
`;

const PostBox = styled.div`
  max-width: 220px;
  width: 45%;
  height: 30vh;
  background-color: var(--color-light-white);
  box-shadow: 3px 3px 5px #dcdcdc;
`;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.5rem;
`;

const Title = styled.div`
  padding: 0.1rem 0.3rem;
  font-weight: var(--weight-semi-bold);
  margin: 0.2rem 0.2rem;

  //DESC: width 넘어가면 ...으로 생략되는 부분
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Tags = styled.div`
  display: flex;
  padding: 0.2rem;
  gap: 0.15rem;
  overflow: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tag = styled.p`
  font-size: var(--font-small);
  background-color: var(--color-primary-green);
  padding: 0.1rem 0.3rem;
  border-radius: 20px;
`;
