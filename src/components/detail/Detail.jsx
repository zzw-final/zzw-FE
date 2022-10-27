import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Tag from "../common/Tag";
import CommentList from "../comment/CommentList";
import { useNavigate } from "react-router-dom";
import TagList from "./TagList";
import SwiperRecipe from "./SwiperRecipe";
import { dateFormat } from "../../util/dateFormat";
import Slide from "../UI/Slide";
import { DetailContext } from "../../context/DetailContext";

function Detail() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [slideIsOpen, setSlideIsOpen] = useState(false);
  const navigate = useNavigate();

  const data = useContext(DetailContext);
  const { commentList, postDetail, setEditedIngredient } = data;

  const foodIngredientList = postDetail?.ingredient
    .map((ingredient) => (!ingredient.isName ? ingredient.ingredientName : undefined))
    .filter((ingredient) => ingredient !== undefined);

  const [, setFoodName] = useState();

  const commentListCnt = commentList?.length;

  const onEditPage = () => {
    setIsEditMode(!isEditMode);
  };

  useEffect(() => {
    const foodName = postDetail?.ingredient?.find((item) => item.isName === true)?.ingredientName;
    setFoodName(foodName);
  }, [postDetail]);

  const tagSearch = (tagName) => {
    navigate(`/search?tag=${tagName}`);
  };

  const slideOpenHandler = () => {
    setSlideIsOpen(true);
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
          <TagList postDetail={postDetail} setEditedIngredient={setEditedIngredient} />
        </Tags>
      )}
      <Content>
        {postDetail && (
          <SwiperRecipe
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            onEditPage={onEditPage}
          />
        )}
      </Content>
      <Footer>
        <Comment onClick={slideOpenHandler}>💬 {commentListCnt}</Comment>
        <CreatedAt>{dateFormat(postDetail?.createAt)}</CreatedAt>
        {slideIsOpen && (
          <Slide setSlideIsOpen={setSlideIsOpen}>
            <CommentList />
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
  box-shadow: 0 0 10px rgb(0 0 0 / 15%);
  border-radius: 14px;
  font-weight: var(--weight-bold);
  width: 17vw;
`;

export default Detail;
