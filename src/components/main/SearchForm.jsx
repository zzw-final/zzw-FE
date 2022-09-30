import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import useInputRef from "../../hooks/useInputRef";
import Tag from "../common/Tag";
import { useSearchParams } from "react-router-dom";

const SearchForm = ({ mainSearch, searchPageSearch }) => {
  const [cookies] = useCookies(["loginNickname"]);
  const [selectOption, setSelectOption] = useState("");
  const [prevSelectOption, setPrevSelectOption] = useState("");
  const [tagList, setTagList] = useState([]);

  const loginNickname = cookies.loginNickname || `반가운 손`;
  const welcomeText = `🥘 ${loginNickname}님, 오늘의 식재료를 입력해보세요!`;

  const selectRef = useRef();

  const onPeriodChange = (event) => {
    setSelectOption(event.target?.value);
    inputRef.current.value = "";
    setTagList([]);
  };

  const options = [
    { value: "tag", label: "재료 | 음식" },
    { value: "title", label: "제목" },
    { value: "nickname", label: "닉네임" },
  ];

  const searchHandler = () => {
    const searchText = inputRef?.current.value;
    const selectOptionRef = selectRef?.current.value;
    if ((selectOptionRef !== "tag" && searchText === "") || tagList === []) {
      alert("빈 값은 입력할 수 없습니다.");
      return;
    }
    if (selectOptionRef === "tag") {
      makeTagList(searchText);
      inputRef.current.value = "";
      tagSearchHandler(selectOptionRef, searchText, tagList);
      return;
    }
    window.location.pathname === "/"
      ? mainSearch(selectOptionRef, searchText)
      : searchPageSearch(selectOptionRef, searchText);
  };

  const tagSearchHandler = (selectOptionRef, searchText, tagList) => {
    console.log("검색페이지에서 tagList", tagList);
    if (window.location.pathname === "/") {
      if (tagList !== [] && searchText === "") {
        mainSearch(selectOptionRef, tagList.toString());
      }
      return;
    }
    searchPageSearch(selectOptionRef, tagList.toString());
  };

  const inputRef = useInputRef("", searchHandler);
  // const inputRef = useRef("");

  // useEffect(() => {
  //   inputRef.current.addEventListener("keypress", logKey);
  //   function logKey(event) {
  //     if (event.code === "Enter") {
  //       searchHandler();
  //       inputRef.current.value = "";
  //     }
  //   }
  // }, []);

  const makeTagList = useCallback(
    (addedTag) => {
      if (addedTag === "") {
        return;
      }
      if (!tagList.includes(addedTag)) {
        setTagList((prevState) => {
          return [...prevState, addedTag];
        });
      }
    },
    [tagList]
  );

  const deleteSelectedTag = (deleteTagName) => {
    setTagList(tagList.filter((tag) => tag !== deleteTagName));
  };

  return (
    <SearchContainer>
      {welcomeText}
      <SearchBox>
        <Form>
          <InputBox>
            <SelectBox
              value={selectOption}
              ref={selectRef}
              onChange={onPeriodChange}
            >
              {options.map((option, idx) => (
                <option value={option.value} key={idx}>
                  {option.label}
                </option>
              ))}
            </SelectBox>
            <TagList>
              {tagList.map((tag, idx) => (
                <Tag
                  tagName={tag}
                  key={idx}
                  isDelBtn={true}
                  delBtnClick={() => {
                    deleteSelectedTag(tag);
                  }}
                />
              ))}
            </TagList>
            <InputForm ref={inputRef} />
            <SearchIcon onClick={searchHandler} />
          </InputBox>
        </Form>
      </SearchBox>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  text-align: center;
`;

const SearchBox = styled.div`
  display: flex;
  padding: 0 10px;
  margin-top: 0.5rem;
  color: var(--color-white);
`;

const Form = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid var(--color-white);
  border-radius: 1rem;
`;

const InputBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0.2rem 0.6rem;
`;

const SelectBox = styled.select`
  border: 0;
  outline: 0;
  background-color: transparent;
  cursor: pointer;
`;

const TagList = styled.div`
  color: var(--color-black);
  display: flex;
  /* background-color: red; */
`;

const InputForm = styled.input`
  width: 100%;
  height: 36px;
  padding: 1rem;
  outline: 0;
  border: 0;
  background-color: transparent;
  min-width: 100px;
`;

export default SearchForm;
