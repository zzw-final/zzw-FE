import React from "react";
import styled from "styled-components";

function EditContent({ editContent, postDetail, imgUpload, imageURL }) {
  return (
    <>
      <ImgDiv src={postDetail?.foodImg}></ImgDiv>
      <input
        type="file"
        accept="image/*"
        multiple="multiple"
        onChange={imgUpload}
      />
      <Content
        defaultValue={postDetail?.content}
        onChange={(e) => {
          editContent(e.target.value);
        }}
      ></Content>
    </>
  );
}

export default EditContent;

const ImgDiv = styled.img`
  width: 50vw;
  margin-left: 25%;
`;

const Content = styled.textarea`
  box-sizing: border-box;
  width: 340px;
  height: 30vh;
  margin-left: 20px;

  border: 1px solid #afadad;
  border-radius: 10px;
`;
