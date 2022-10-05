import React, { useState } from "react";
import styled from "styled-components";

function WriteAddCard({ imgUpload, formValues, setFomvalues }) {
  //이미지파일을 set해주기 위한 useState
  const [imageUrl, setImageUrl] = useState("");
  const [pageIdx, setPageIdx] = useState(0);

  //서버에서 이미지를 url로 받아옴
  const getImgUpload = async (i, e) => {
    const result = await imgUpload(e);
    setImageUrl(result.data.data.imageUrl);
  };

  // 이미지 추가하기위한 핸들러
  let handleChangeIMG = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.src;
    setFomvalues(newFormValues);
    console.log(formValues);
  };

  // content추가하기 위한 핸들러
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    newFormValues[i].page = i;
    console.log("i", i);
    setFomvalues(newFormValues);
  };

  //
  let addFormFields = (e) => {
    setFomvalues([...formValues, { imageUrl: "", content: "", page: 0 }]);
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
      <form>
        {formValues.map((element, index) => (
          <AddCardDiv key={index}>
            <PreviewImg
              name="imageUrl"
              value={imageUrl}
              src={imageUrl}
              onLoad={(e) => handleChangeIMG(index, e)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => getImgUpload(index, e)}
            />
            <Cardtextarea
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
                삭제
              </button>
            ) : null}
          </AddCardDiv>
        ))}

        <div className="button-section">
          <Addbutton
            className="button add"
            type="button"
            onClick={() => addFormFields()}
          >
            새로운 단계 추가하기
          </Addbutton>
          <button className="button submit" type="submit">
            Submit
          </button>
        </div>
      </form>
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
  margin: 0rem 1rem 0rem 3rem;
`;

const Cardtextarea = styled.textarea`
  width: 60vw;
  height: 10vh;
  margin: 0rem 1rem 0rem 2rem;
`;

const Addbutton = styled.button`
  background-color: white;
  border: 0;
  width: 80vw;
  height: 5vh;
  border-radius: 10px;
  margin-left: 10vw;
  &:hover {
    background: var(--color-dark-white);
    color: white;
  }
`;
