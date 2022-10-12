import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");

  const inputHandler = (e) => {
    setValue(e.target.value);
  };

  return [value, inputHandler, setValue];
};

export default useInput;
