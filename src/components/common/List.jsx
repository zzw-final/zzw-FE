import React from "react";
import styled from "styled-components";
import Recipe from "../posts/Recipe";

const List = ({ list, listName, ...props }) => {
  return (
    <ListContainer {...props}>
      {list && list.map((item) => <Recipe post={item} key={item.postId} {...props} />)}
    </ListContainer>
  );
};

const ListContainer = styled.section`
  display: ${(props) => props.display || "flex"};
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  grid-row-gap: 1rem;
  justify-items: center;
  margin: ${(props) => props.margin || "0 0.5rem"};
  height: ${(props) => props.gridHeight || "210px"};
  overflow-y: hidden;
  padding-bottom: 0.2rem;
`;

export default List;
