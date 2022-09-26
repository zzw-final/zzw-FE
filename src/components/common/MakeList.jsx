import React from "react";
import RecipeBest from "../posts/RecipeBest";
import styled from "styled-components";

const MakeList = ({ list }) => (
  <ListContainer>
    {/* list?.map((item) => (<RecipeBest post={item} key={item.postId} />
    )) */}
  </ListContainer>
);

const ListContainer = styled.section`
  display: flex;
  height: 240px;
`;

export default MakeList;
