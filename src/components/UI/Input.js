import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

function Input({ onChangeFn }) {
  return (
    <SearchBox>
      <span>
        <SearchIcon color="warning" />
      </span>
      <Inputs placeholder="닉네임을 검색하세요." onChange={onChangeFn}></Inputs>
    </SearchBox>
  );
}

export default Input;

const SearchBox = styled.div`
  text-align: center;
  position: relative;
  span {
    position: absolute;
    top: 7px;
    left: 7.5%;
  }
`;

const Inputs = styled.input`
  width: 90%;
  height: 2.3rem;
  margin-bottom: 0.3rem;
  padding: 1rem 0 1rem 2.7rem;
  background-color: var(--color-white-orange);
  border: none;
  border-radius: 10px;
  outline: none;
  caret-color: lightgray;
  font-weight: var(--weight-semi-bold);
  font-size: var(--font-small);

  &::placeholder {
    color: #777777;
    font-size: var(--font-small);
    font-weight: var(--weight-regular-thick);
  }
  &::-webkit-search-decoration,
  &::--search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;
