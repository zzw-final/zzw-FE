import { useEffect, useRef } from "react";

const useInputRef = (initialValue, submitAction) => {
  const ref = useRef(initialValue);

  useEffect(() => {
    ref.current.addEventListener("keypress", logKey);
    function logKey(event) {
      if (event.code === "Enter") {
        event.preventDefault();
        submitAction();
        ref.current.value = "";
      }
    }
  }, []);

  return ref;
};

export default useInputRef;
