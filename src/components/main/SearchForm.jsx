import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import useInputRef from "../../hooks/useInputRef";

const SearchForm = () => {
  const inputRef = useInputRef("");

  const [cookies] = useCookies(["loginNickname"]);
  const loginNickname = cookies.loginNickname || `반가운 손`;
  const welcomeText = `🥘 ${loginNickname}님, 오늘의 식재료를 입력해보세요!`;

  return (
    <SearchContainer>
      {welcomeText}
      <SearchBox>
        <Form>
          <InputBox>
            <SelectBox name="" id="">
              <option>재료 | 음식</option>
              <option>제목</option>
              <option>닉네임</option>
            </SelectBox>
            <InputForm ref={inputRef} />
            <SearchIcon />
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
  color: var(--color-dark-orange);
`;

const Form = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid var(--color-dark-orange);
  border-radius: 1rem;
`;

const InputBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0.2rem 0.6rem;
`;

const SelectBox = styled.select`
  /* appearance: none; */
  border: 0;
  outline: 0;
`;
const InputForm = styled.input`
  width: 100%;
  height: 36px;
  padding: 1rem;
  outline: 0;
  border: 0;
`;

export default SearchForm;
