import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

function WriteAddCard({ imgUpload, formValues, setFomvalues }) {
  //이미지파일을 set해주기 위한 useState
  const [imageUrl, setImageUrl] = useState("");

  const getImgUpload = async (i, e) => {
    const result = await imgUpload(e);
    setImageUrl(result.data.data.imageUrl);
  };

  useEffect(() => {}, [imageUrl]);

  let handleChangeIMG = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.src;
    // console.log("이미지", e.target);
    setFomvalues(newFormValues);
    console.log(formValues);
  };

  console.log("밖에서는 이미지가 받아와질까?", imageUrl);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFomvalues(newFormValues);
  };

  let addFormFields = () => {
    setFomvalues([...formValues, { name: "", email: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFomvalues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {formValues.map((element, index) => (
          <div key={index}>
            <label>이미지파일</label>
            <input
              type="file"
              accept="image/*"
              //   value={element.imageUrl || ""}
              onChange={(e) => getImgUpload(index, e)}
            />
            <img
              name="imageUrl"
              value={imageUrl}
              src={imageUrl}
              onLoad={(e) => handleChangeIMG(index, e)}
              //   onChange={(e) => alert("ㅠㅠ", e)}
            />
            <label>컨텐트</label>
            <input
              type="text"
              name="content"
              value={element.content || ""}
              onChange={(e) => handleChange(index, e)}
            />
            <label>{index + 1}</label>
            {index ? (
              <button
                type="button"
                className="button remove"
                onClick={() => removeFormFields(index)}
              >
                Remove
              </button>
            ) : null}
          </div>
        ))}
        <div className="button-section">
          <button
            className="button add"
            type="button"
            onClick={() => addFormFields()}
          >
            Add
          </button>
          <button className="button submit" type="submit">
            Submit
          </button>
        </div>
      </form>

      {/* {formValues.map((element, index) =>(
        <div>
      <AddCardDiv key={index}>
        <PreviewImg />
        <input
        type="file"
        accept="image/*"
        name='image'
        value={element.name || ""}
        onChange={(e)=> handleChange(index, e)}/>
        <div>
          <Cardtextarea
          placeholder="레시피를 입력해주세요"
          name="content"
          value={element.name || ""}
          onChange={(e)=> handleChange(index, e)}
          />
        </div>
        {index ? (
            <button
              type="button"
              onClick={() => removeFormFields(index)}
            >
              삭제
            </button>): null}

        <button>확인</button>
      </AddCardDiv> */}
    </>
  );
}

export default WriteAddCard;

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
