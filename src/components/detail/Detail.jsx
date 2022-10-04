import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Tag from "../common/Tag";
import CommentList from "../comment/CommentList";
import { getCookie } from "../../util/cookie";
import Toast from "../UI/Toast";
import SwiperRecipe from "../common/SwiperRecipe";

function Detail({
  postDetail,
  tagList,
  post,
  remove,
  update,
  commentList,
  onDelete,
  likeToggle,
}) {
  const navigate = useNavigate();
  const nickname = getCookie("loginNickname");
  const url = window.location.href;
  const [toast, setToast] = useState(false);

  const copyUrl = async () => {
    setToast(true);
    await navigator.clipboard.writeText(url);
  };

  const foodName = postDetail?.ingredient.find(
    (ingredient) => ingredient.isName
  ).ingredientName;

  const foodIngredientList = postDetail?.ingredient
    .map((ingredient) =>
      !ingredient.isName ? ingredient.ingredientName : undefined
    )
    .filter((ingredient) => ingredient !== undefined);

  const commentListCnt = commentList?.length;

  const [toggleTagList, setToggleTagList] = useState(false);

  const openTagBox = () => {
    setToggleTagList(!toggleTagList);
  };

  return (
    <DetailContainer>
      <Header>
        <FoodnameDiv>
          <Foodname>{foodName}</Foodname>
          <Time>⏱ {postDetail?.time} min</Time>
        </FoodnameDiv>
        {nickname === postDetail?.nickname && (
          <ButtonDiv>
            <Button
              onClick={() => {
                navigate(`/editpage/${postDetail?.postId}`);
              }}
            >
              수정
            </Button>
            <Button onClick={onDelete}>삭제</Button>
          </ButtonDiv>
        )}
      </Header>
      <Tags>
        {foodIngredientList?.map((ingredient, i) => (
          <Tag height="20px" tagName={ingredient} key={i} />
        ))}
      </Tags>
      <Content>
        {postDetail && (
          <SwiperRecipe postDetail={postDetail} likeToggle={likeToggle} />
        )}
      </Content>
      {toast && <Toast setToast={setToast} />}
      <Footer>
        <FootLeft>
          <Icon onClick={copyUrl} src={"/copy.png"} alt="공유하기" />
          <Icon src={"/eye-off.png"} alt="신고하기" />
        </FootLeft>
        <Comment onClick={openTagBox}>💬 {commentListCnt}</Comment>

        <CommentListBox id="tagList" top={toggleTagList}>
          <CommentFoldLine onClick={openTagBox}></CommentFoldLine>
          <SearchBox>
            <CommentBox>
              <CommentList
                postId={postDetail?.postId}
                post={post}
                remove={remove}
                update={update}
                commentList={commentList}
              />
            </CommentBox>
          </SearchBox>
        </CommentListBox>
      </Footer>
    </DetailContainer>
  );
}

const DetailContainer = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.9rem 1.5rem 1.9rem;
`;

const FoodnameDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Foodname = styled.div`
  font-size: var(--font-medium-large);
  font-weight: var(--weight-bolder);
`;

const Time = styled.div`
  font-size: var(--font-small);
  margin-left: 0.3rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  font-size: var(--font-small);
  font-weight: var(--weight-semi-bold);
  color: #232323;
  text-align: center;
  width: 2.5rem;
  height: 1.2rem;
  background-color: #fbf8f0;
  border-radius: 3px;
  box-shadow: 2px 2px 5px #bebebe;
  border: none;
`;

const Tags = styled.div`
  margin-left: 1rem;
  display: flex;
  padding: 0.2rem;
  gap: 0.5rem;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled.div`
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 1.5rem 0rem 1.5rem;
  align-items: center;
`;

const FootLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
`;

const Comment = styled.div`
  background-color: var(--color-white);
  padding: 0.2rem 0.5rem;
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
  border-radius: 15px;
  font-weight: var(--weight-bold);
`;

const SearchBox = styled.div`
  /* background-color: lavender; */
  display: flex;
  flex-direction: column;
  height: 14vh;
  position: relative;
`;

const CommentFoldLine = styled.div`
  width: 20%;
  height: 0.1rem;
  background-color: var(--color-orange);
  margin: 0.5rem auto 2rem auto;
`;

const CommentListBox = styled.div`
  background-color: var(--color-white);
  z-index: 1;
  width: 90%;
  height: 100%;
  border-radius: 2rem 2rem 0 0;
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
  top: ${({ top }) => (top ? "20%" : "100%")};
  position: fixed;
  left: 0;
`;

const CommentBox = styled.div`
  width: 100%;
`;

export default Detail;
