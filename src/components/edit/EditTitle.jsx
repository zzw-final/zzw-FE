import React, { useState } from "react";
import styled from "styled-components";
import { imgInstance } from "../../api/request";

function EditTitle({
  setTitle,
  setTime,
  setIngredient,
  setFoodName,
  postDetail,
  setContent,
  setImage,
}) {
  //태그작성기능
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);

  const submitTag = (prevState) => {
    if (!tagList.includes(tagItem)) {
      setTagList((prevState) => {
        return [...prevState, { ingredientName: tagItem }];
      });
    }
    setTagItem("");
  };

  //태그 삭제기능
  const deleteTag = (ingredientName) => {
    setTagList(
      tagList.filter((tagItem) => tagItem.ingredientName !== ingredientName)
    );
  };
  //누르면 태그가 하나의 div
  const onKeyPress = (e) => {
    if (e.target.value !== "" && e.key === "Enter") {
      submitTag();
    }
  };
  //음식이름 뽑기
  const foodName = postDetail?.ingredient?.find(
    (ingredient) => ingredient.isName === true
  ).ingredientName;
  //재료이름만 뽑기
  const foodIngredientList = postDetail?.ingredient
    ?.map((ingredient) =>
      ingredient.isName !== true ? ingredient.ingredientName : undefined
    )
    .filter((ingredient) => ingredient !== undefined);

  const [imageURL, setImageURL] = useState([]);

  console.log("기존작성글", postDetail);

  // useEffect(() => {
  //   setImage(imageURL);
  // }, [imageURL]);

  //서버에서 이미지 url로 받아오는 요청
  const imgUpload = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const file = e.target.files[0];
      const formdata = new FormData();
      formdata.append("file", file);

      imgInstance
        .post("/api/post/image", formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log("이미지 업로드 완료됨", res.data);
          console.log("이미지 URL확인", res.data.data.imageUrl);
          setImageURL(res?.data?.data.imageUrl);
          console.log("이미지값", imageURL);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Stdiv>
        <WriteTitleinput
          placeholder="제목을 입력해주세요"
          defaultValue={postDetail?.title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <div styled={{ margin: "10px", display: "flex" }}>
          <FoodnameTag
            placeholder="요리이름 입력해주세요"
            defaultValue={foodName}
            onChange={(e) => {
              setFoodName(e.target.value);
            }}
          />
          <TimeSelect
            placeholder="요리 시간을 선택해주세요"
            defaultValue={postDetail?.time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          >
            <option value="0">5분</option>
            <option value="1">10분</option>
            <option value="2">15분</option>
            <option value="3">30분 이상</option>
          </TimeSelect>
        </div>
        <TagBox>
          {tagList.map((tagItem, i) => {
            return (
              <Tagdiv key={i}>
                <div>{tagItem.ingredientName}</div>
                <Button onClick={() => deleteTag(tagItem.ingredientName)}>
                  X
                </Button>
              </Tagdiv>
            );
          })}
          <IngredintTag
            value={tagItem}
            placeholder="재료를 태그로 입력해주세요"
            defaultValue={postDetail?.ingredientName}
            onChange={(e) => {
              setTagItem(e.target.value);
            }}
            onKeyPress={onKeyPress}
          />
        </TagBox>
      </Stdiv>
      <ImgDiv src={imageURL} defaultValue={postDetail?.foodImg}></ImgDiv>
      <input
        type="file"
        accept="image/*"
        multiple="multiple"
        onChange={imgUpload}
      />
      <Content
        defaultValue={postDetail?.content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></Content>
    </>
  );
}

export default EditTitle;

const Stdiv = styled.div`
  margin: 10px;
  height: 50%;
`;

const WriteTitleinput = styled.input`
  box-sizing: border-box;
  /* position: absolute; */
  width: 340px;
  height: 5vh;
  left: 26px;
  top: 90px;
  border: 1px solid #a8a8a8;
  border-radius: 10px;
  margin: 9px;
`;

const FoodnameTag = styled.input`
  box-sizing: border-box;
  /* position: absolute; */
  width: 220px;
  height: 5vh;
  left: 26px;
  top: 149px;
  margin-left: 8px;

  border: 1px solid #acacac;
  border-radius: 10px;
`;

const TimeSelect = styled.select`
  box-sizing: border-box;

  /* position: absolute; */
  width: 110px;
  height: 5vh;
  left: 273px;
  top: 149px;
  margin-left: 5px;

  border: 1px solid #9c9c9c;
  border-radius: 10px;
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 340px;
  min-height: 5vh;
  margin: 8px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  &:focus-within {
    border-color: var(--color-light-blue);
  }
`;

const IngredintTag = styled.input`
  box-sizing: border-box;
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`;

const Tagdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: var(--color-dark-pink);
  border-radius: 5px;
  color: white;
  font-size: 13px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 1px;
  background-color: white;
  border-radius: 50%;
  color: black;
`;

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
