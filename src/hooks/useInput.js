import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue ? initialValue : "");

  const inputHandler = (e) => {
    setValue(e.target.value);
  };

  return [value, inputHandler, setValue];
};

export default useInput;
