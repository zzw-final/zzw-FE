import { useState } from "react";

const useImageInput = () => {
  const [value, setValue] = useState("");
  const [valueUrl, setValueUrl] = useState("");

  const changeHandler = (e) => {
    const image = e.target.files[0];
    const imageFile = URL.createObjectURL(e.target.files[0]);
    setValue(image);
    setValueUrl(imageFile);
  };

  return [value, setValue, valueUrl, setValueUrl, changeHandler];
};

export default useImageInput;
