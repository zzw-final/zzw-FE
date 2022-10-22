import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import useInputRef from "../../hooks/useInputRef";
import Tag from "../common/Tag";
import { useSearchParams } from "react-router-dom";

const SearchForm = ({ mainSearch, searchPageSearch, showToast }) => {
  const [selectOption, setSelectOption] = useState("tag");
  const [tagList, setTagList] = useState([]);

  const [searchParams] = useSearchParams();
  const searchedTitle = searchParams.get("title");
  const searchedTag = searchParams.get("tag");
  const searchedNickname = searchParams.get("nickname");

  const pathName = window.location.pathname;

  const selectRef = useRef();

  const onPeriodChange = (event) => {
    setSelectOption(event.target?.value);
    inputRef.current.value = "";
    setTagList([]);
  };

  useEffect(() => {
    localStorage.setItem("tagList", tagList);
  }, [tagList]);

  const options = [
    { value: "tag", label: "재료 | 음식" },
    { value: "title", label: "제목" },
    { value: "nickname", label: "닉네임" },
  ];

  const searchHandler = () => {
    const searchText = inputRef?.current?.value;
    const selectOptionRef = selectRef?.current?.value;
    const savedTagList = localStorage.getItem("tagList");
    inputRef.current.value = "";

    if (!searchText && !savedTagList.length) return alert("빈 값은 검색할 수 없습니다.");
    if (!searchText && selectOptionRef === "tag")
      return searchRequest(selectOptionRef, savedTagList);
    if (selectOptionRef === "tag") return makeTagList(searchText);
    searchRequest(selectOptionRef, "", searchText);
  };

  const searchRequest = (selectOptionRef, tagList, searchText) => {
    pathName === "/"
      ? mainSearch(selectOptionRef, tagList ? tagList.toString() : searchText)
      : searchPageSearch(selectOptionRef, tagList ? tagList.toString() : searchText);
  };

  const inputRef = useInputRef("", searchHandler);

  const makeTagList = useCallback(
    (addedTag) => {
      const localTaglist = localStorage.getItem("tagList").split(",");
      if (addedTag === "") return new Error("tag 가 비었습니다.");
      if (localTaglist.length > 4) return showToast();
      if (!localTaglist.includes(addedTag))
        return setTagList((prevState) => [...prevState, addedTag]);
    },
    [showToast]
  );

  useEffect(() => {
    inputRef.current.value = searchedTag || searchedTitle || searchedNickname;
    if (searchedTag !== null) {
      setSelectOption("tag");
      searchedTag.split(",").map((item) => makeTagList(item));
      inputRef.current.value = "";
    }
    if (searchedTitle !== null) setSelectOption("title");
    if (searchedNickname !== null) setSelectOption("nickname");
  }, [inputRef, searchedTag, searchedTitle, searchedNickname, makeTagList]);

  const deleteSelectedTag = (deleteTagName) => {
    setTagList(tagList.filter((tag) => tag !== deleteTagName));
  };

  useEffect(() => {
    inputRef.current.addEventListener("keydown", logKey);
    function logKey(event) {
      event.preventDefault();
      if (event.code === "Backspace" && !inputRef?.current?.value) {
        setTagList((prev) => prev.slice(0, prev.length - 1));
      }
    }
  }, [inputRef]);

  return (
    <SearchContainer>
      <SearchBox>
        <Form>
          <InputBox>
            <SelectBox value={selectOption} ref={selectRef} onChange={onPeriodChange}>
              {options.map((option, idx) => (
                <option value={option.value} key={idx}>
                  {option.label}
                </option>
              ))}
            </SelectBox>
            <SearchInfo>
              <TagList id="tagListBox">
                {tagList?.map((tag, idx) => (
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
            </SearchInfo>
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

const SearchBox = styled.div`
  display: flex;
  padding: 0 20px;
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
`;

const SelectBox = styled.select`
  border: 0;
  outline: 0;
  background-color: transparent;
  font-size: var(--font-small);
  color: var(--color-black);
  cursor: pointer;
  position: absolute;
`;

const SearchInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5rem;
  margin-right: 1.5rem;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
  height: 100%;
`;

const TagList = styled.div`
  color: var(--color-black);
  display: flex;
`;

const SearchIconDiv = styled.div`
  position: absolute;
  right: 30px;
  display: flex;
`;

const InputForm = styled.textarea`
  width: 100%;
  height: 36px;
  line-height: 37px;
  padding-left: 0.4rem;
  font-size: var(--font-small);
  outline: 0;
  border: 0;
  min-width: 80px;
  background-color: transparent;
  margin-right: 1.5rem;
  resize: none;
  white-space: nowrap;
`;

export default SearchForm;
