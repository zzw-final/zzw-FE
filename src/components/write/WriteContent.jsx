import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { instance } from "../../api/request";

const WriteContent = ({ setContent, setImage, image, content }) => {
  const [imageURL, setImageURL] = useState([]);

  useEffect(() => {
    setImage(imageURL);
  }, [setImage]);

  const upLoadImg = useRef();

  const openFile = () => {
    upLoadImg.current.Click();
  };

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const img = e.target.files[0];
      console.log(img);
      const formdata = new FormData();
      formdata.append("file", img);
      // instance 수정필요함
      const config = {
        Headers: {
          "content-type": "multipart/form-data",
        },
      };
      instance.get("/api/auth/post/image", formdata, config);
    }
  };

  return (
    <>
      {/* <image src={}></image> */}
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg, image/gif"
        ref={upLoadImg}
        // style={{ display: "none" }}
        onChange={onChange}
        value={image}
      />
      {/* <div onClick={openFile}></div> */}
      <Content
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
