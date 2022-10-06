import React, { useRef, useState } from "react";
import styled from "styled-components";

function WriteAddCard({ imgUpload, formValues, setFomvalues }) {
  //이미지파일을 set해주기 위한 useState
  const [imageUrl, setImageUrl] = useState("");
  const [previews, setPreview] = useState([]);

  //서버에서 이미지를 url로 받아옴
  const getImgUpload = async (i, e) => {
    const result = await imgUpload(e);
    setImageUrl(result.data.data.imageUrl);
    window.sessionStorage.setItem(i, result.data.data.imageUrl);
  };

  // 이미지 추가하기위한 핸들러
  let handleChangeIMG = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = window.sessionStorage.getItem(i);
    //page 추가 (0페이지부터 시작)
    newFormValues[i].page = i;
    setFomvalues(newFormValues);
    console.log(formValues);
  };

  // content추가하기 위한 핸들러
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    //page 추가 (0페이지부터 시작)
    newFormValues[i].page = i;
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

  const imageInput = useRef();

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  return (
    <>
      <form style={{ height: "200vh" }} onSubmit={handleSubmit}>
        {formValues.map((element, index) => (
          <AddCardDiv key={index}>
            {console.log("스토리지", window.sessionStorage.getItem(index))}
            <PreviewImg src={window.sessionStorage.getItem(index)}></PreviewImg>
            <img
              alt="submitImg"
              style={{ display: "none" }}
              name="imageUrl"
              value={imageUrl}
              onLoad={(e) => handleChangeIMG(index, e)}
              src={imageUrl}
            />
            <StyledFileInput
              onClick={() => {
                imageInput.current?.click();
              }}
            >
              이미지 선택
            </StyledFileInput>
            <ImgNotion>최대 1MB까지 업로드 가능합니다.</ImgNotion>
            <input
              style={{
                display: "none",
              }}
              type="file"
              accept="image/*"
              ref={imageInput}
              onChange={(e) => onClickImageUpload && getImgUpload(index, e)}
            />
            <Cardtextarea
              type="text"
              name="content"
              value={element.content || ""}
              onChange={(e) => handleChange(index, e)}
            />
            <label
              name="page"
              value={element.page || ""}
              onChange={(e) => handleChange(index, e)}
              style={{
                marginTop: "2px",
                marginBottom: "5px",
                gridColumnStart: "2",
                gridRowStart: "4",
                fontSize: "10px",
              }}
            >
              {index + 1}
            </label>
            {index ? (
              <Dletbutton
                type="button"
                className="button remove"
                onClick={() => removeFormFields(index)}
              >
                X
              </Dletbutton>
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
          {/* <button className="button submit" type="submit">
            Submit
          </button> */}
        </div>
      </form>
    </>
  );
}

export default WriteAddCard;

const AddCardDiv = styled.div`
  background-color: white;
  margin: 5vh auto 4vh auto;
  width: 80vw;
  height: 40vh;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1rem 1fr 2rem;
  grid-template-rows: 18vh 4vh 1fr 1fr;
  justify-items: center;
  align-items: stretch;
`;

const PreviewImg = styled.img`
  grid-column-start: 2;
  grid-row-start: 1;
  width: 50vw;
  height: 15vh;
  margin: 1rem 0rem 0rem 0.5rem;
  border: 0
  border-radius : 10px
`;

const Cardtextarea = styled.textarea`
  grid-column-start: 2;
  grid-row-start: 3;
  width: 60vw;
  height: 10vh;
  margin: 0.5rem 0rem 0rem 0.5rem;
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

const Dletbutton = styled.button`
  grid-column-start: 3;
  grid-row-start: 1;
  width: 5vw;
  height: 4vh;
  border: 0;
  border-radius: 10px;
  margin: 0.5rem 1rem 0rem 0rem;
`;

const StyledFileInput = styled.button`
  grid-column-start: 2;
  grid-row-start: 2;
  width: 25vw;
  height: 2vh;
  font-size: 10px;
  border: 0;
  border-radius: 5px;
  background-color: #ffbb56;
  margin-top: 2vw;
`;

const ImgNotion = styled.label`
  font-size: 3px;
  grid-column-start: 2;
  grid-row-start: 2;
  margin-top: 7vw;
  color: var(--color-dark-white);
`;
