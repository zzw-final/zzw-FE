import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import styled from "styled-components";

const SearchForm = () => {
  const [selected, setSelected] = useState("");

  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  return (
    <div>
      <SearchContainer>
        <FormControl sx={{ minWidth: 120 }}>
          <Select defaultValue={10} size="small">
            <MenuItem value={10}>재료 | 음식</MenuItem>
            <MenuItem value={20}>제목</MenuItem>
            <MenuItem value={30}>닉네임</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="comment"
          // value={comment}
          // onChange={onChange}
          size="small"
          fullWidth
          sx={{ fontSize: 14, ml: 0.5 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 14 }} />
              </InputAdornment>
            ),
          }}
        />
      </SearchContainer>
    </div>
  );
};

const SearchContainer = styled.div`
  display: flex;
  padding: 0 4px;
`;

export default SearchForm;
