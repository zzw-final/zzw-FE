import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { useCookies } from "react-cookie";
import useInputRef from "../../hooks/useInputRef";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "../../util/dateFormat";

const CommentItem = ({ commentItem, remove, update }) => {
  const { commentId, userId, profile, nickname, comment, grade, createdAt } =
    commentItem;
  const [updatedComment] = useState(comment);
  const [visibleEditBtns, setVisibleEditBtns] = useState("block");
  const [visibleEditCommentBox, setVisibleEditCommentBox] = useState("none");
  const [cookies] = useCookies(["loginNickname"]);
  const navigate = useNavigate();

  const loginNickname = cookies.loginNickname;

  const openUpdateForm = () => {
    setVisibleEditCommentBox("block");
    setVisibleEditBtns("none");
    updateCommentRef.current.focus();
    updateCommentRef.current.value = comment;
  };

  useEffect(() => {
    updateCommentRef.current.value = updatedComment;
  }, [updatedComment]);

  const cancleEdit = () => {
    setVisibleEditCommentBox("none");
    setVisibleEditBtns("block");
    updateCommentRef.current.value = comment;
  };

  const removeComment = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      remove(commentId);
    }
  };

  const updateComment = () => {
    const sendData = {
      commentId: commentId,
      comment: updateCommentRef.current.value,
    };
    update(sendData);
    setVisibleEditCommentBox("none");
    setVisibleEditBtns("block");
  };

  const updateCommentRef = useInputRef("", updateComment);

  const userPage = () => {
    if (+cookies.loginUserId === userId) navigate(`/mypage`);
    else navigate(`/mypage/${userId}`);
  };

  return (
    <ItemContainer>
      <Info>
        <InfoAvatar>
          <Avatar
            alt="user_img"
            src={profile}
            sx={{ width: 28, height: 28, mr: 1 }}
            onClick={userPage}
          />
          <div>
            <Nickname onClick={userPage}>{nickname} &gt; </Nickname>
            <GradeCreatedAt>
              <Grade>{grade}</Grade>
              <CreatedAt>{dateFormat(createdAt)}</CreatedAt>
            </GradeCreatedAt>
          </div>
        </InfoAvatar>
        {loginNickname && loginNickname === nickname ? (
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
        <EditComment ref={updateCommentRef}></EditComment>
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
  padding: 0.2rem 1rem;
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
