import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../../redux/modules/commentSlice";

const CommentItem = ({ commentItem, postId }) => {
  const { commentId, userId, img, nickname, comment, grade, createdAt } =
    commentItem;
  const [updatedComment, setUpdatedComment] = useState(comment);
  const [visibleEditBtns, setVisibleEditBtns] = useState("block");
  const [visibleEditCommentBox, setVisibleEditCommentBox] = useState("none");

  const loginUser = "moon"; // 추후 세션 스토리지에서 로그인 정보 가져옴

  const dispatch = useDispatch();

  const getUpdatedComment = (event) => {
    const text = event.target.value;
    setUpdatedComment(text);
  };

  const openUpdateForm = () => {
    setVisibleEditCommentBox("block");
    setVisibleEditBtns("none");
  };

  const cancleEdit = () => {
    setVisibleEditCommentBox("none");
    setVisibleEditBtns("block");
    setUpdatedComment(comment);
  };

  const updateComment = () => {
    const sendData = {
      postId: postId,
      content: updatedComment,
    };
    dispatch(updateComment(sendData));
  };

  const removeComment = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      dispatch(deleteComment(commentId));
    } else {
    }
  };

  return (
    <ItemContainer>
      <Info>
        <InfoAvatar>
          <Avatar
            alt="user_img"
            src={img}
            sx={{ width: 28, height: 28, mr: 1 }}
          />
          <div>
            <Nickname>{nickname} &gt; </Nickname>
            <GradeCreatedAt>
              <Grade>{grade}</Grade>
              <CreatedAt>{createdAt}</CreatedAt>
            </GradeCreatedAt>
          </div>
        </InfoAvatar>
        {loginUser && loginUser === nickname ? (
          <EditBtns visibleEditBtns={visibleEditBtns}>
            <UpdateBtn onClick={openUpdateForm}>수정</UpdateBtn>
            <DeleteBtn onClick={removeComment}>X</DeleteBtn>
          </EditBtns>
        ) : (
          ""
        )}
      </Info>
      <Content visibleEditBtns={visibleEditBtns}>{comment}</Content>
      <EditedCommentBox visibleEditCommentBox={visibleEditCommentBox}>
        <EditComment
          value={updatedComment}
          onChange={getUpdatedComment}
        ></EditComment>
        <EditCommentBtns>
          <UpdateComplateBtn onClick={updateComment}>
            수정 완료
          </UpdateComplateBtn>
          <CancleBtn onClick={cancleEdit}>취소</CancleBtn>
        </EditCommentBtns>
      </EditedCommentBox>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.2em 0.4em;
`;

const Info = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  /* background-color: lemonchiffon; */
  position: relative;
`;

const InfoAvatar = styled.div`
  display: flex;
  align-items: center;
  /* background-color: lightblue; */
`;

const Nickname = styled.div`
  font-size: var(--font-small);
  color: var(--color-black);
`;

const Grade = styled.div`
  font-size: var(--font-micro);
  color: var(--color-grey);
`;

const CreatedAt = styled.div`
  font-size: var(--font-micro);
  color: var(--color-grey);
  position: absolute;
  right: 0px;
`;

const GradeCreatedAt = styled.div`
  display: flex;
  justify-content: space-between;
  /* background-color: red; */
  width: 100%;
`;

const EditBtns = styled.div`
  display: ${(props) => props.visibleEditBtns};
`;

const UpdateBtn = styled.div`
  font-size: var(--font-micro);
  background-color: var(--color-light-white);
  padding: 3px 6px;
  border-radius: 10px;
  position: absolute;
  right: 28px;
  top: 4px;
`;

const DeleteBtn = styled.div`
  font-size: var(--font-micro);
  color: var(--color-white);
  background-color: var(--color-dark-pink);
  padding: 3px 6px;
  border-radius: 10px;
  position: absolute;
  right: 3px;
  top: 4px;
`;

const EditedCommentBox = styled.div`
  display: ${(props) => props.visibleEditCommentBox};
`;

const EditComment = styled.input`
  width: 100%;
  margin-bottom: 4px;
`;

const EditCommentBtns = styled.div`
  display: flex;
  justify-content: right; ;
`;

const UpdateComplateBtn = styled.div`
  font-size: var(--font-micro);
  background-color: var(--color-light-white);
  padding: 3px 6px;
  border-radius: 10px;
`;

const CancleBtn = styled.div`
  font-size: var(--font-micro);
  color: var(--color-white);
  background-color: var(--color-dark-pink);
  padding: 3px 6px;
  border-radius: 10px;
  margin-left: 5px;
`;

const Content = styled.div`
  width: 100%;
  font-size: var(--font-small);
  display: ${(props) => props.visibleEditBtns};
`;

export default CommentItem;
