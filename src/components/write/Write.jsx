import React from "react";
import styled from "styled-components";
import WriteHeader from "./WriteHeader";
import WriteTitle from "./WriteTitle";
import WriteContent from "./WriteContent";

const Write = (props) => {
  // console.log(props);
  return (
    <div>
      <WriteHeader onSubmitHandler={props.onSubmitHandler} />
      <WriteTitle
        setTitle={props.setTitle}
        setFoodName={props.setFoodName}
        setIngredient={props.setIngredient}
        setTime={props.setTime}
      />
      <WriteContent
        setContent={props.setContent}
        setImage={props.setImage}
        image={props.image}
      />
    </div>
  );
};

export default Write;
