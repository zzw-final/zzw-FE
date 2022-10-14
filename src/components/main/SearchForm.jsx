import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import useInputRef from "../../hooks/useInputRef";
import Tag from "../common/Tag";
import { useSearchParams } from "react-router-dom";

const SearchForm = ({ mainSearch, searchPageSearch, showToast }) => {
  const [cookies] = useCookies(["loginNickname"]);
  const [selectOption, setSelectOption] = useState("tag");
  const [tagList, setTagList] = useState([]);

  const [searchParams] = useSearchParams();
  const searchedTitle = searchParams.get("title");
  const searchedTag = searchParams.get("tag");
  const searchedNickname = searchParams.get("nickname");

  const loginNickname = cookies.loginNickname || `반가운 손`;

  const selectRef = useRef();

  const moveScroll = () => {
    const tagListBox = document.querySelector("#tagListBox");
    if (tagListBox?.scrollWidth !== 0) {
      tagListBox?.scrollTo(tagListBox?.clientWidth + 1000, 0);
      // tagListBox?.scrollTo();
    }
  };

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
    if (selectOptionRef !== "tag" && searchText === "") {
      alert("빈 값은 검색할 수 없습니다.");
      return;
    }
    inputRef.current.value = "";
    if (searchText === "" && selectOptionRef === "tag") {
      return tagSearchHandler(
        selectOptionRef,
        searchText,
        localStorage.getItem("tagList")
      );
    } else if (selectOptionRef === "tag") {
      makeTagList(searchText);
      return;
    }
    window.location.pathname === "/"
      ? mainSearch(selectOptionRef, searchText)
      : searchPageSearch(selectOptionRef, searchText);
  };

  useEffect(() => {
    localStorage.setItem("tagList", tagList);
  }, [tagList]);

  const tagSearchHandler = (selectOptionRef, searchText, tagList) => {
    if (window.location.pathname === "/") {
      if (tagList !== [] && searchText === "") {
        mainSearch(selectOptionRef, tagList.toString());
      }
      return;
    }
    searchPageSearch(selectOptionRef, tagList.toString());
  };

  const inputRef = useInputRef("", searchHandler);

  const makeTagList = (addedTag) => {
    if (addedTag === "") {
      return new Error("tag 가 비었습니다.");
    }
    const localTaglist = localStorage.getItem("tagList").split(",");
    if (localTaglist.length > 4) {
      showToast();
      return;
    }
    if (!localTaglist.includes(addedTag)) {
      setTagList((prevState) => [...prevState, addedTag]);
    }
    moveScroll();
  };

  useEffect(() => {
    if (searchedTag !== null) {
      setSelectOption("tag");
      inputRef.current.value = searchedTag;
      searchedTag.split(",").map((item) => {
        return makeTagList(item);
      });
      inputRef.current.value = "";
    } else if (searchedTitle !== null) {
      setSelectOption("title");
      inputRef.current.value = searchedTitle;
    } else if (searchedNickname !== null) {
      setSelectOption("nickname");
      inputRef.current.value = searchedNickname;
    }
  }, [inputRef, searchedTag, searchedTitle, searchedNickname]);

  const deleteSelectedTag = (deleteTagName) => {
    setTagList(tagList.filter((tag) => tag !== deleteTagName));
  };

  // useEffect(() => {
  //   inputRef.current.addEventListener("keypress", logKey);
  //   function logKey(event) {
  //     if (event.code === "Backspace") {
  //       console.log("backspace..");
  // submitAction();
  // inputRef.current.reset();
  //     }
  //   }
  // }, []);

  return (
    <SearchContainer>
      <span>
        <LoginNickname>{loginNickname}</LoginNickname>님, 오늘의 식재료를
        입력해보세요!
      </span>
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
            <TagList id="tagListBox">
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
            <SearchIconDiv>
              <SearchIcon onClick={searchHandler} />
            </SearchIconDiv>
          </InputBox>
        </Form>
      </SearchBox>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  text-align: center;
  font-size: var(--font-semi-small);
`;

const LoginNickname = styled.span`
  color: var(--color-main-dark-orange);
  font-weight: var(--weight-semi-bold);
`;

const SearchBox = styled.div`
  display: flex;
  padding: 0 20px;
  margin-top: 0.5rem;
  color: var(--color-real-light-orange);
`;

const Form = styled.div`
  display: flex;
  width: 100%;
  border: 2px solid var(--color-real-light-orange);
  background-color: var(--color-white);
  border-radius: 1rem;
`;

const InputBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0.2rem 0.6rem;
  /* overflow: scroll; */
`;

const SelectBox = styled.select`
  border: 0;
  outline: 0;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
`;

const TagList = styled.div`
  color: var(--color-black);
  display: flex;
  margin-left: 5rem;
  overflow: scroll;
`;

const SearchIconDiv = styled.div`
  position: absolute;
  right: 30px;
`;

const InputForm = styled.input`
  /* width: 100%; */
  height: 36px;
  /* padding: 0.8rem; */
  outline: 0;
  border: 0;
  min-width: 100px;
  background-color: transparent;
  margin-right: 1.5rem;
`;

export default SearchForm;
