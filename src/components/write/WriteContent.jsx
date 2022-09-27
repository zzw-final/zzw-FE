import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { imgInstance } from "../../api/request";

const WriteContent = ({ setContent, setFile, file, content }) => {
  const [imageURL, setImageURL] = useState([]);

  useEffect(() => {
    setFile(imageURL);
  }, [imageURL]);

  // const upLoadImg = useRef();

  const imgUpload = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const file = e.target.files[0];
      console.log("이미지 파일 받기", file);
      const formdata = new FormData();
      formdata.append("file", file);

      // formdata console로 확인하기;
      // for (let [key, value] of formdata) {
      //   console.log(`${key}: ${value}`);
      // }

      imgInstance
        .post("/api/post/image", formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log("이미지 업로드 완료됨", res.data);
          console.log("이미지 URL확인", res.data.data.imageUrl);
          setImageURL(res.data.data.imageUrl);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <ImgDiv src={imageURL}></ImgDiv>
      <input
        type="file"
        accept="image/*"
        // ref={upLoadImg}
        // style={{ display: "none" }}
        multiple="multiple"
        onChange={imgUpload}
        value={file}
      />
      <Content
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></Content>
    </>
  );
};
export default WriteContent;

const Content = styled.textarea`
  box-sizing: border-box;
  width: 340px;
  height: 30vh;
  margin-left: 20px;

  border: 1px solid #afadad;
  border-radius: 10px;
`;

const ImgDiv = styled.img`
  width: 50vw;
  margin-left: 25%;
`;
