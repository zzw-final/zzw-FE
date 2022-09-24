import React from "react";
import CommentList from "../components/comment/CommentList";
import LayoutPage from "../components/common/LayoutPage";
import Detail from "../components/detail/Detail";

function DetailPage() {
  return (
    <LayoutPage>
      <Detail />
      <CommentList />
    </LayoutPage>
  );
}

export default DetailPage;
