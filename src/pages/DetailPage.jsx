import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tag from "../components/common/Tag";
import { instance } from "../api/request";
import axios from "axios";

function DetailPage() {
  const postId = useParams().id;
  // const params = useParams();
  console.log(postId);
  const [detail, setDetail] = useState({});
  const [likeNum, setLikeNum] = useState();

  // const getData = async () => {
  //   await axios
  //     .get(`http://15.164.216.199/api/post/${post_id}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       // setDetail(response.data);
  //     });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <LayoutPage>
      <Detail />
      <CommentList />
    </LayoutPage>
  );
}

export default DetailPage;
