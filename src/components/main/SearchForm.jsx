import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import useInputRef from "../../hooks/useInputRef";

const SearchForm = ({ search }) => {
  const [cookies] = useCookies(["loginNickname"]);
  const [selectOption, setSelectOption] = useState("tag");
  const [tagList, setTagList] = useState([]);

  const loginNickname = cookies.loginNickname || `반가운 손`;
  const welcomeText = `🥘 ${loginNickname}님, 오늘의 식재료를 입력해보세요!`;

  const onPeriodChange = (event) => {
    setSelectOption(event.target.value);
    inputRef.current.value = "";
  };

  const options = [
    { value: "tag", label: "재료 | 음식" },
    { value: "title", label: "제목" },
    { value: "nickname", label: "닉네임" },
  ];

  console.log("period? 밖", selectOption);

  const searchHandler = () => {
    const searchText = inputRef.current.value;
    console.log("들어와?");
    console.log("searchText?", searchText);
    console.log("period? 안", selectOption);
    if (searchText === "") {
      alert("빈 값은 입력할 수 없습니다.");
      return;
    }
    switch (selectOption) {
      case "tag":
        // return search(period, { tagList: searchText });
        break;
      case "title":
        return search(selectOption, { title: searchText });
      case "nickname":
        return search(selectOption, { nickname: searchText });
      default:
        break;
    }
    inputRef.current.value = "";
  };

  const inputRef = useInputRef("", searchHandler);

  if (selectOption === "tag") {
    console.log("tag 선택");
  }

  useEffect(() => {
    if (selectOption === "tag") {
      console.log("selectOption > ", selectOption);
      inputRef.current.addEventListener("keypress", logKey);
    }
    function logKey(event) {
      if (event.code === "Space") {
        console.log("tag space! 가 아니라 무조건 space 시 먹음");
      }
    }
  }, [inputRef, selectOption]);

  return (
    <SearchContainer>
      {welcomeText}
      <SearchBox>
        <Form>
          <InputBox>
            <SelectBox value={selectOption} onChange={onPeriodChange}>
              {options.map((option, idx) => (
                <option value={option.value} key={idx}>
                  {option.label}
                </option>
              ))}
            </SelectBox>
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

const InputForm = styled.input`
  width: 100%;
  height: 36px;
  padding: 1rem;
  outline: 0;
  border: 0;
  background-color: transparent;
`;

export default SearchForm;
