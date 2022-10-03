import React, { useState } from "react";
import styled from "styled-components";

function WriteCard(props) {
  return (
    <div>
      {props.countList &&
        props.countList.map((item, idx) => (
          <AddCardDiv key={idx}>
            <label></label>
            <PreviewImg
              src={props.imageURL}
              // src={"https://cdn-icons-png.flaticon.com/512/149/149092.png"}
            />
            <input
              type="file"
              accept="image/*"
              onChange={props.imgUpload}
              value={props.imageURL}
            />
            <div>
              <Cardtextarea placeholder="제목을 입력해주세요" />
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
