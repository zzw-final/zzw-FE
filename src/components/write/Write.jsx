import React from "react";
import styled from "styled-components";
import WriteHeader from "./WriteHeader";
import WriteTitle from "./WriteTitle";
import WriteContent from "./WriteContent";

const Write = (props) => {
  // console.log(props);

  return (
    <WriteContanier>
      <WriteHeader onSubmitHandler={props.onSubmitHandler} />
      <WriteTitle
        setTitle={props.setTitle}
        setFoodName={props.setFoodName}
        setIngredient={props.setIngredient}
        setTime={props.setTime}
      />
      <WriteContent
        content={props.content}
        setContent={props.setContent}
        setFile={props.setFile}
        file={props.file}
      />
    </WriteContanier>
  );
};

export default Write;

const WriteContanier = styled.div;
