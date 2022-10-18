import { useState, useEffect } from "react";
import styled from "styled-components";
import Tag from "../common/Tag";
import CommentList from "../comment/CommentList";
import { getCookie } from "../../util/cookie";
import { useNavigate } from "react-router-dom";
import TagList from "./TagList";
import SwiperRecipe from "./SwiperRecipe";
import { dateFormat } from "../../util/dateFormat";
import Slide from "../UI/Slide";

function Detail({
  postDetail,
  // tagList,
  id,
  post,
  remove,
  update,
  commentList,
  onDelete,
  likeToggle,
  imgUpload,
  editedValues,
  setEditedValues,
  onSubmitHandler,
  editForm,
  setEditedIngredient,
  greyButton,
  followHandler,
}) {
  const nickname = getCookie("loginNickname");
  const [isEditMode, setIsEditMode] = useState(false);
  const [slideIsOpen, setSlideIsOpen] = useState(false);
  const navigate = useNavigate();

  const foodIngredientList = postDetail?.ingredient
    .map((ingredient) =>
      !ingredient.isName ? ingredient.ingredientName : undefined
    )
    .filter((ingredient) => ingredient !== undefined);

  const [foodName, setFoodName] = useState();

  const commentListCnt = commentList?.length;

  const onEditPage = () => {
    setIsEditMode(!isEditMode);
  };

  useEffect(() => {
    const foodName = postDetail?.ingredient?.find(
      (item) => item.isName === true
    )?.ingredientName;
    setFoodName(foodName);
  }, [postDetail]);

  const onCancle = () => {
    setIsEditMode(!isEditMode);
  };

  const tagSearch = (tagName) => {
    navigate(`/search?tag=${tagName}`);
  };

  return (
    <DetailContainer>
      <Header></Header>

      {!isEditMode ? (
        <Tags>
          {foodIngredientList?.map((ingredient, i) => (
            <Tag
              height="20px"
              tagName={ingredient}
              key={i}
              onClickHandler={() => {
                tagSearch(ingredient);
              }}
            />
          ))}
        </Tags>
      ) : (
        <Tags>
          <TagList
            postDetail={postDetail}
            editForm={editForm}
            setEditedIngredient={setEditedIngredient}
          />
        </Tags>
      )}

      <Content>
        {postDetail && (
          <SwiperRecipe
            postDetail={postDetail}
            likeToggle={likeToggle}
            isEditMode={isEditMode}
            imgUpload={imgUpload}
            editedValues={editedValues}
            setEditedValues={setEditedValues}
            editForm={editForm}
            onEditPage={onEditPage}
            onCancle={onCancle}
            onSubmitHandler={onSubmitHandler}
            onDelete={onDelete}
            greyButton={greyButton}
            followHandler={followHandler}
          />
        )}
      </Content>
      <Footer>
        <Comment
          onClick={() => {
            setSlideIsOpen(true);
          }}
        >
          💬 {commentListCnt}
        </Comment>
        <CreatedAt>{dateFormat(postDetail?.createAt)}</CreatedAt>
        {slideIsOpen && (
          <Slide setSlideIsOpen={setSlideIsOpen}>
            <CommentFoldLine
              onClick={() => {
                setSlideIsOpen(false);
              }}
            ></CommentFoldLine>
            <CommentBox>
              <CommentList
                postId={postDetail?.postId}
                post={post}
                remove={remove}
                update={update}
                commentList={commentList}
              />
            </CommentBox>
          </Slide>
        )}
      </Footer>
    </DetailContainer>
  );
}

const DetailContainer = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 1.9rem 1.5rem 1.9rem;
`;

const Tags = styled.div`
  margin-left: 1rem;
  display: flex;
  padding: 0.2rem;
  gap: 0.5rem;
  white-space: nowrap;
  overflow-x: scroll;

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
  padding: 0.5rem 1.5rem 0rem 1.5rem;
  align-items: center;
`;

const CreatedAt = styled.div`
  font-size: var(--font-micro);
  color: var(--color-grey);
  right: 20vw;
`;

const Comment = styled.div`
  background-color: var(#fff7eb);
  padding: 0.2rem;
  text-align: center;
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
  border-radius: 14px;
  font-weight: var(--weight-bold);
  width: 17vw;
`;

const CommentFoldLine = styled.div`
  width: 20%;
  height: 0.2rem;
  background-color: var(--color-orange);
  margin: 0.5rem auto 2rem auto;
`;

const CommentBox = styled.div`
  width: 100%;
  height: 85%;
`;

export default Detail;
