import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";

function WriteCard({ idx, imgUpload, getPageData }) {
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState("");

  const sendData = {
    imageURL: imgUrl,
    content: content,
    page: idx,
  };

  const onSendData = () => {
    getPageData(sendData);
  };

  const getImgUpload = async (e) => {
    const result = await imgUpload(e);
    setImgUrl(result.data.data.imageUrl);
  };

  return (
    <div>
      <AddCardDiv>
        <label></label>
        <PreviewImg src={imgUrl} />
        <input type="file" accept="image/*" onChange={getImgUpload} />
        <div>
          <Cardtextarea
            placeholder="레시피를 입력해주세요"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            // ref={contentRef}
          />
        </div>
        {/* <label>{idx + 1}</label> */}
        <button onClick={onSendData}>확인</button>
      </AddCardDiv>
    </div>
  );
}

export default WriteCard;

const AddCardDiv = styled.div`
  background-color: white;
  margin: 5vh auto 5vh auto;

  width: 80vw;
  height: 30vh;
  border-radius: 20px;
  display: grid;
  justify-items: center;
  align-items: stretch;
`;

const PreviewImg = styled.img`
  width: 40vw;
  height: 10vh;
  margin: 0rem 1rem 0rem 1rem;
`;

const Cardtextarea = styled.textarea`
  width: 60vw;
  height: 10vh;
  margin: 0rem 1rem 0rem 1rem;
`;
