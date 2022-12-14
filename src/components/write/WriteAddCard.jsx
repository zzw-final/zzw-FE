import React, { useRef, useState } from "react";
import styled from "styled-components";
import imageCompression from "browser-image-compression";

function WriteAddCard({ imgUpload, formValues, setFomvalues }) {
  //이미지파일을 set해주기 위한 useState
  const [imageUrl, setImageUrl] = useState("");
  const [previews, setPreview] = useState([]);

  //서버에서 이미지를 url로 받아옴
  const getImgUpload = async (i, e) => {
    const [file] = e.target.files;
    const newFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    });
    const resizingFile = new File([newFile], file.name, { type: file.type });
    const result = await imgUpload(resizingFile);
    setImageUrl(result.data.data.imageUrl);
    window.sessionStorage.setItem(i, result.data.data.imageUrl);
  };

  // 이미지 추가하기위한 핸들러
  let handleChangeIMG = (i, e) => {
    let newFormValues = [...formValues];
    if (
      newFormValues[i].imageUrl === null ||
      newFormValues[i].imageUrl === ""
    ) {
      newFormValues[i].imageUrl = window.localStorage.getItem("titleIMG");
    } else {
      newFormValues[i].imageUrl = window.sessionStorage.getItem(i);
    }
    console.log(newFormValues[i].imageUrl);
    //page 추가 (0페이지부터 시작)
    newFormValues[i].page = i;
    setFomvalues(newFormValues);
    console.log(formValues);
  };

  // content추가하기 위한 핸들러
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    if (
      newFormValues[i].imageUrl === null ||
      newFormValues[i].imageUrl === ""
    ) {
      newFormValues[i].imageUrl = window.localStorage.getItem("titleIMG");
    } else {
      newFormValues[i].imageUrl = window.sessionStorage.getItem(i);
    }
    newFormValues[i][e.target.name] = e.target.value;
    //page 추가 (0페이지부터 시작)
    newFormValues[i].page = i;
    if (newFormValues[i].content.length < 256) {
      setFomvalues(newFormValues);
    } else {
      alert("최대 255자 까지 입력가능합니다!");
    }
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
  };

  const imageInput = useRef();

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const noImg = (e) => {
    e.target.src =
      "https://user-images.githubusercontent.com/110365677/195792478-d66b388e-f214-434e-affe-40f18f7463a2.png";
  };

  return (
    <>
      <form
        style={{
          width: "400px",
          height: "auto",
          maxHeight: "auto",
          marginBottom: "120px",
        }}
        onSubmit={handleSubmit}
      >
        {formValues.length < 11 &&
          formValues.map((element, index) => (
            <AddCardDiv key={index} style={{ maxHeight: "548.56px" }}>
              <PreviewImg
                onError={noImg}
                src={
                  window.sessionStorage.getItem(index) ||
                  "https://user-images.githubusercontent.com/110365677/195768702-db712364-f837-45c6-9adf-aee6d195dadb.png"
                }
                onClick={onClickImageUpload}
              ></PreviewImg>
              <img
                alt="submitImg"
                style={{ display: "none" }}
                name="imageUrl"
                value={imageUrl}
                onLoad={(e) => handleChangeIMG(index, e)}
                src={imageUrl}
              />
              <input
                style={{
                  display: "none",
                }}
                type="file"
                accept="image/*"
                ref={imageInput}
                onChange={(e) => getImgUpload(index, e)}
              />
              <Cardtextarea
                type="text"
                name="content"
                placeholder="레시피를 단계별로 작성해주세요 ! 최대 255자 까지 입력가능합니다."
                value={element.content || ""}
                onChange={(e) => handleChange(index, e)}
              />
              <label
                name="page"
                value={element.page || ""}
                onChange={(e) => handleChange(index, e)}
                style={{
                  margin: "2rem 0rem 5px 1rem",
                  gridColumnStart: "2",
                  gridRowStart: "1",
                  fontSize: "19px",
                  fontWeight: "var(--weight-semi-bold)",
                }}
              >
                조리페이지 - {index + 1}
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
          {formValues.length < 10 ? (
            <Addbutton
              className="button add"
              type="button"
              onClick={() => addFormFields()}
            >
              조리 페이지 추가하기
            </Addbutton>
          ) : (
            <div />
          )}
        </div>
      </form>
    </>
  );
}

export default WriteAddCard;

const AddCardDiv = styled.div`
  /* background-color: green; */
  margin: 5vh auto 4vh auto;
  width:
  width: 97%;
  max-width: 97%;
  min-width: 97%
  height: 70vh;
  display: grid;
  justify-items: left;
  grid-template-columns: 1rem 1fr 1rem;
  grid-template-rows: 5vh 1fr 1fr;
  /* align-items: stretch; */
`;

const PreviewImg = styled.img`
  grid-column-start: 2;
  grid-row-start: 2;
  width: 55vw;
  height: 25vh;
  margin: 2rem 3rem 0rem 4.3rem;
  box-sizing: border-box;
  border: 0;
  border-radius: 10px;
`;

const Cardtextarea = styled.textarea`
  grid-column-start: 2;
  grid-row-start: 3;
  width: 90vw;
  /* max-width:95% */
  margin: 1rem 1rem 0 0;
  background-color: var(--color-light-white);
  height: 30vh;
  box-sizing: border-box;
  border: 0;
  border-radius: 10px;
  resize: none;
  outline: none;
  padding: 20px;
`;

const Addbutton = styled.button`
  background-color: #ffbb56;
  color: white;
  font-size: var(--font-medium);
  font-weight: var(--weight-semi-bold);
  border: 0;
  width: 90vw;
  height: 5vh;
  border-radius: 10px;
  margin-top: 1rem;
  margin-left: 6vw;
  &:hover {
    border: 2px white;
  }
`;

const Dletbutton = styled.button`
  grid-column-start: 2;
  grid-row-start: 2;
  background-color: transparent;
  width: 5vw;
  height: 2vh;
  border: 0;
  border-radius: 10px;
  margin: -0.5rem 1rem 1rem 8rem;
`;
