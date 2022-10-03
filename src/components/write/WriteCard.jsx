import React, { useEffect, useState } from "react";
import styled from "styled-components";

function WriteCard({
  countList,
  setImageURL,
  imageURL,
  imgUpload,
  setContent,
  setContent1,
  setPageNum,
}) {
  return (
    <div>
      {countList &&
        countList?.map((item, idx) => (
          <AddCardDiv key={idx}>
            {/* <PreviewImg
              src={imageURL}
            src={"https://cdn-icons-png.flaticon.com/512/149/149092.png"}
            />
            <input
              type="file"
              accept="image/*"
                onChange={imgUpload}
                value={imageURL}
            /> */}
            <div>
              <Cardtextarea
                placeholder="레시피를 입력해주세요"
                onChange={(e) => {
                  setContent1(e.target.value);
                }}
              />
            </div>
            <label>{idx + 1}</label>
          </AddCardDiv>
        ))}
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
  height 10vh;
  margin: 0rem 1rem 0rem 1rem;`;

const Cardtextarea = styled.textarea`
 width: 60vw;
  height 10vh;
  margin: 0rem 1rem 0rem 1rem;
`;
