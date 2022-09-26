import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tag from "../components/common/Tag";
import { instance } from "../api/request";
import axios from "axios";
import LayoutPage from "../components/common/LayoutPage";
import Detail from "../components/detail/Detail";
import CommentList from "../components/comment/CommentList";

function DetailPage() {
  const post_Id = useParams().id;
  const [postDetail, setPostDetail] = useState();

  useEffect(() => {
    const getData = async () => {
      const data = await instance.get(`/api/post/${post_Id}`);
      setPostDetail(data.data.data);
    };

    getData();
  }, []);

  return (
    <LayoutPage>
      <Detail postDetail={postDetail} />
      <CommentList postId={postDetail.postId} />
    </LayoutPage>
  );
}

export default DetailPage;
