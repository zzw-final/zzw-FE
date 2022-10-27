import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import useInputRef from "../../hooks/useInputRef";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "../../util/dateFormat";
import Button from "../UI/Button";
import { DetailContext } from "../../context/DetailContext";
import { getCookie } from "../../util/cookie";

const CommentItem = ({ commentItem }) => {
  const data = useContext(DetailContext);

  const { remove, update } = data;
  const { commentId, userId, profile, nickname, comment, grade, createdAt } = commentItem;

  const [updatedComment] = useState(comment);
  const [visibleEditBtns, setVisibleEditBtns] = useState("block");
  const [visibleEditCommentBox, setVisibleEditCommentBox] = useState("none");

  const loginNickname = getCookie("loginNickname");
  const loginUserId = getCookie("loginUserId");

  const navigate = useNavigate();

  const openUpdateForm = () => {
    setVisibleEditCommentBox("block");
    setVisibleEditBtns("none");
    updateCommentRef.current.focus();
    updateCommentRef.current.value = comment;
  };

  const cancleEdit = () => {
    setVisibleEditCommentBox("none");
    setVisibleEditBtns("block");
    updateCommentRef.current.value = comment;
  };

  const removeComment = () => {
    if (window.confirm("삭제 하시겠습니까?")) remove(commentId);
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

  useEffect(() => {
    updateCommentRef.current.value = updatedComment;
  }, [updatedComment, updateCommentRef]);

  const userPage = () => {
    if (loginUserId === userId) navigate(`/mypage`);
    else navigate(`/mypage/${userId}`);
  };

  return (
    <ItemContainer>
      <Avatar
        alt="user_img"
        src={profile}
        sx={{ width: 38, height: 38, mr: 1 }}
        onClick={userPage}
      />
      <Info>
        <InfoAvatar>
          <div>
            <Nickname onClick={userPage}>
              <span>{nickname}</span> {grade}
            </Nickname>
          </div>
        </InfoAvatar>
        {loginNickname && loginNickname === nickname ? (
          <EditBtns visibleEditBtns={visibleEditBtns}>
            <Button
              name="commonBtn"
              onClick={openUpdateForm}
              backgroundColor="var(--color-light-white)"
              padding="0.15rem 0.3rem"
              borderRadius="0.5rem"
              position="absolute"
              right="1.8rem"
              top="0rem"
            >
              수정
            </Button>
            <Button
              name="commonBtn"
              onClick={removeComment}
              backgroundColor="var(--color-real-light-orange)"
              padding="0.15rem 0.5rem"
              borderRadius="0.5rem"
              position="absolute"
              right="0.2rem"
              top="0rem"
            >
              X
            </Button>
          </EditBtns>
        ) : (
          ""
        )}

        <Content visibleEditBtns={visibleEditBtns}>{comment}</Content>
        <EditedCommentBox visibleEditCommentBox={visibleEditCommentBox}>
          <EditComment ref={updateCommentRef}></EditComment>
          <EditCommentBtns>
            <Button
              name="commonBtn"
              onClick={updateComment}
              backgroundColor="var(--color-light-white)"
              padding="0.15rem 0.3rem"
              borderRadius="0.5rem"
              position="absolute"
              right="2.4rem"
              top="0rem"
            >
              수정 완료
            </Button>
            <Button
              name="commonBtn"
              onClick={cancleEdit}
              backgroundColor="var(--color-real-light-orange)"
              padding="0.15rem 0.3rem"
              borderRadius="0.5rem"
              position="absolute"
              right="0.2rem"
              top="0rem"
            >
              취소
            </Button>
          </EditCommentBtns>
        </EditedCommentBox>
        <CreatedAt>{dateFormat(createdAt)}</CreatedAt>
      </Info>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.3rem 0rem;
`;

const Info = styled.div`
  height: 3rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  height: auto;
  padding: 0.2rem;
`;

const InfoAvatar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
`;

const Nickname = styled.div`
  font-size: var(--font-micro);
  color: var(--color-grey);
  span {
    font-size: var(--font-small);
    color: var(--color-black);
  }
`;
const CreatedAt = styled.div`
  font-size: var(--font-micro);
  color: var(--color-dark-white);
  margin-top: 0.2rem;
`;

const EditBtns = styled.div`
  display: ${(props) => props.visibleEditBtns};
`;

const EditedCommentBox = styled.div`
  display: ${(props) => props.visibleEditCommentBox};
`;

const EditComment = styled.input`
  width: 100%;
`;

const EditCommentBtns = styled.div`
  display: flex;
  justify-content: right; ;
`;

const Content = styled.div`
  width: 100%;
  font-size: var(--font-small);
  color: var(--color-grey);
  display: ${(props) => props.visibleEditBtns};
  word-break: break-all;
`;

export default CommentItem;
