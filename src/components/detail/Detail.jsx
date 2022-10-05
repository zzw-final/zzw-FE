import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Tag from "../common/Tag";
import CommentList from "../comment/CommentList";
import { getCookie } from "../../util/cookie";
import Toast from "../UI/Toast";
import SwiperRecipe from "../common/SwiperRecipe";

function Detail({
  postDetail,
  // tagList,
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
}) {
  const navigate = useNavigate();
  const nickname = getCookie("loginNickname");
  const url = window.location.href;
  const [toast, setToast] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const foodIngredientList = postDetail?.ingredient
    .map((ingredient) =>
      !ingredient.isName ? ingredient.ingredientName : undefined
    )
    .filter((ingredient) => ingredient !== undefined);

  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState(foodIngredientList);

  const copyUrl = async () => {
    setToast(true);
    await navigator.clipboard.writeText(url);
  };

  const foodName = postDetail?.ingredient.find(
    (ingredient) => ingredient.isName
  ).ingredientName;

  const commentListCnt = commentList?.length;

  const [toggleTagList, setToggleTagList] = useState(false);

  const openTagBox = () => {
    setToggleTagList(!toggleTagList);
  };

  const onEditPage = () => {
    setIsEditMode(!isEditMode);
  };

  const submitTag = (prevState) => {
    if (!tagList?.includes(tagItem)) {
      setTagList((prevState) => {
        return [...prevState, tagItem];
      });
    }
    setTagItem("");
  };

  const deleteTag = (ingredientName) => {
    setTagList(tagList.filter((tagItem) => tagItem !== ingredientName));
  };

  const onKeyPress = (e) => {
    if (e.target.value !== "" && e.key === "Enter") {
      submitTag();
    }
  };

  // useEffect(() => {
  //   const ingredientList_d = postDetail?.ingredient?.filter(
  //     (item) => item.isName === false
  //   );
  //   setTagList(ingredientList_d);
  // }, [postDetail]);

  useEffect(() => {
    editForm("ingredient", tagList);
  }, [tagList, editForm]);

  return (
    <DetailContainer>
      <Header>
        <FoodnameDiv>
          <Foodname>{foodName}</Foodname>
          {/* 요리이름 수정부분>>> */}
          <input
            defaultValue={foodName}
            onBlur={(e) => {
              editForm("foodName", e.target.value);
            }}
          ></input>
          {/* <<<요리이름수정부분 */}
          <Time>⏱ {postDetail?.time} min</Time>
          {/* 요리시간 수정부분 >>>> */}
          <TimeSelect
            placeholder="요리 시간을 선택해주세요"
            onBlur={(e) => {
              editForm("time", e.target.value);
            }}
          >
            <option value="5분">5분</option>
            <option value="10분">10분</option>
            <option value="15분">15분</option>
            <option value="30분">30분 이상</option>
          </TimeSelect>
          {/* <<<<<요리시간 수정부분 */}
        </FoodnameDiv>
        {nickname === postDetail?.nickname && (
          <ButtonDiv>
            <Button onClick={onSubmitHandler}>수정완료</Button>
            <Button onClick={onEditPage}>수정</Button>
            <Button onClick={onDelete}>삭제</Button>
          </ButtonDiv>
        )}
      </Header>
      {/* <Tags>
        {foodIngredientList?.map((ingredient, i) => (
          <Tag height="20px" tagName={ingredient} key={i} />
        ))}
      </Tags> */}
      {/* 태그수정부분>>>>>> */}
      {/* 
      <Tags>
        {foodIngredientList.map((ingredient, i) => (
          <Tag height="20px" tagName={ingredient} key={i} />
        ))}
        <IngredintTag
          value={tagItem}
          onBlur={(e) => {
            editForm("ingredient", e.target.value);
          }}
          onKeyPress={onKeyPress}
        />
      </Tags> */}

      <TagBox>
        {tagList &&
          tagList.map((tagItem, i) => {
            return (
              <Tagdiv key={i}>
                <div>{tagItem}</div>
                <Button onClick={() => deleteTag(tagItem)}>X</Button>
              </Tagdiv>
            );
          })}
        <IngredintTag
          value={tagItem}
          onChange={(e) => {
            setTagItem(e.target.value);
          }}
          onKeyPress={onKeyPress}
        />
      </TagBox>
      {/* <<<<태그수정(값도 잘 들어가집니다..한글자씩만 입력가능한 문제....) */}

      {/* <Content>
        {postDetail && (
          <SwiperRecipe
            postDetail={postDetail}
            likeToggle={likeToggle}
            isEditMode={isEditMode}
            imgUpload={imgUpload}
            editedValues={editedValues}
            setEditedValues={setEditedValues}
            editForm={editForm}
          />
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
      </Footer> */}
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

const TimeSelect = styled.select`
  box-sizing: border-box;

  /* position: absolute; */
  width: 110px;
  height: 5vh;
  left: 273px;
  top: 149px;
  margin-left: 5px;

  border: 1px solid #9c9c9c;
  border-radius: 10px;
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
const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 340px;
  min-height: 5vh;
  margin: 8px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  &:focus-within {
    border-color: var(--color-light-blue);
  }
`;

const Tagdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: var(--color-dark-pink);
  border-radius: 5px;
  color: white;
  font-size: 13px;
`;

const IngredintTag = styled.input`
  box-sizing: border-box;
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
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
  height: 0.2rem;
  background-color: var(--color-orange);
  margin: 0.5rem auto 2rem auto;
`;

const CommentListBox = styled.div`
  background-color: var(--color-white);
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0px 0px 20px #5b5b5b;
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
  top: ${({ top }) => (top ? "9%" : "100%")};
  position: fixed;
  left: 0;
`;

const CommentBox = styled.div`
  width: 100%;
`;

export default Detail;
