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
    <div>
      <div>
        <div>#요리이름</div>
        <button>수정</button>
        <button>삭제</button>
      </div>

      <div>
        <div>제목</div>
        <div>작성자</div>
      </div>

      <Tag></Tag>

      <div>
        <img></img>
      </div>
      <div>작성날짜</div>
      <div>조아요</div>
      <div>{likeNum}</div>

      <div></div>
    </div>
  );
}

export default DetailPage;
