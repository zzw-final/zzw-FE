import React from "react";
import styled from "styled-components";
import Recipe from "../posts/Recipe";

const List = ({ list, listName, ...props }) => {
  return (
    <ListContainer {...props}>
      {list && list?.map((item) => <Recipe post={item} key={item.postId} {...props} />)}
    </ListContainer>
  );
};

const ListContainer = styled.section`
  display: ${(props) => props.display || "flex"};
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  grid-row-gap: 1rem;
  justify-items: center;
  margin: ${(props) => props.margin};
  height: 210px;
  overflow-y: hidden;
`;

export default List;
