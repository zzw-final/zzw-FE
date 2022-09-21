import { useState } from "react";

const useShowModal = () => {
  const [isModal, setIsModal] = useState(false);
  const handler = () => {
    setIsModal(!isModal);
  };
  return [isModal, handler];
};

export default useShowModal;
