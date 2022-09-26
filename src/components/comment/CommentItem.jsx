import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../../redux/modules/commentSlice";
import { useCookies } from "react-cookie";

const CommentItem = ({ commentItem, postId }) => {
  const { commentId, userId, profile, nickname, comment, grade, createdAt } =
    commentItem;
  const [updatedComment, setUpdatedComment] = useState(comment);
  const [visibleEditBtns, setVisibleEditBtns] = useState("block");
  const [visibleEditCommentBox, setVisibleEditCommentBox] = useState("none");
  const [cookies] = useCookies([]);
  const updateCommentRef = useRef();
  const loginNickname = cookies.loginNickname;

  const dispatch = useDispatch();

  const openUpdateForm = () => {
    setVisibleEditCommentBox("block");
    setVisibleEditBtns("none");
    updateCommentRef.current.focus();
  };

  useEffect(() => {
    updateCommentRef.current.value = updatedComment;
  }, [updatedComment]);

  useEffect(() => {
    updateCommentRef.current.focus();
  });

  const cancleEdit = () => {
    setVisibleEditCommentBox("none");
    setVisibleEditBtns("block");
    updateCommentRef.current.value = comment;
  };

  const update = () => {
    const sendData = {
      commentId: commentId,
      comment: updateCommentRef.current.value,
    };
    dispatch(updateComment(sendData));
    setVisibleEditCommentBox("none");
    setVisibleEditBtns("block");
  };

  useEffect(() => {
    updateCommentRef.current.addEventListener("keypress", logKey);
    function logKey(event) {
      if (event.code === "Enter") {
        update();
      }
    }
  }, []);

  const remove = () => {
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
            src={profile}
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
        {loginNickname && loginNickname === nickname ? (
          <EditBtns visibleEditBtns={visibleEditBtns}>
            <UpdateBtn onClick={openUpdateForm}>수정</UpdateBtn>
            <DeleteBtn onClick={remove}>X</DeleteBtn>
          </EditBtns>
        ) : (
          ""
        )}
      </Info>
      <Content visibleEditBtns={visibleEditBtns}>{comment}</Content>
      <EditedCommentBox visibleEditCommentBox={visibleEditCommentBox}>
        <EditComment ref={updateCommentRef}></EditComment>
        <EditCommentBtns>
          <UpdateComplateBtn onClick={update}>수정 완료</UpdateComplateBtn>
          <CancleBtn onClick={cancleEdit}>취소</CancleBtn>
        </EditCommentBtns>
      </EditedCommentBox>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.2rem 0.4rem;
`;

const Info = styled.div`
  height: 3rem;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const InfoAvatar = styled.div`
  display: flex;
  align-items: center;
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
  width: 100%;
`;

const EditBtns = styled.div`
  display: ${(props) => props.visibleEditBtns};
`;

const UpdateBtn = styled.div`
  font-size: var(--font-micro);
  background-color: var(--color-light-white);
  padding: 0.15rem 0.3rem;
  border-radius: 0.5rem;
  position: absolute;
  right: 1.6rem;
  top: 0.25rem;
`;

const DeleteBtn = styled.div`
  font-size: var(--font-micro);
  color: var(--color-white);
  background-color: var(--color-dark-pink);
  padding: 0.15rem 0.3rem;
  border-radius: 0.5rem;
  position: absolute;
  right: 0.2rem;
  top: 0.25rem;
`;

const EditedCommentBox = styled.div`
  display: ${(props) => props.visibleEditCommentBox};
`;

const EditComment = styled.input`
  width: 100%;
  margin-bottom: 0.4rem;
`;

const EditCommentBtns = styled.div`
  display: flex;
  justify-content: right; ;
`;

const UpdateComplateBtn = styled.div`
  font-size: var(--font-micro);
  background-color: var(--color-light-white);
  padding: 0.15rem 0.3rem;
  border-radius: 0.5rem;
`;

const CancleBtn = styled.div`
  font-size: var(--font-micro);
  color: var(--color-white);
  background-color: var(--color-dark-pink);
  padding: 0.15rem 0.3rem;
  border-radius: 0.5rem;
  margin-left: 0.3rem;
`;

const Content = styled.div`
  width: 100%;
  font-size: var(--font-small);
  display: ${(props) => props.visibleEditBtns};
`;

export default CommentItem;
