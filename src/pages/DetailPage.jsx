import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tag from "../components/common/Tag";
import { instance } from "../api/request";
import axios from "axios";
import LayoutPage from "../components/common/LayoutPage";
import Detail from "../components/detail/Detail";

function DetailPage() {
  const post_Id = useParams().id;
  const [postDetail, setPostDetail] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await instance.get(`/api/post/${post_Id}`);
      setPostDetail(data.data.data);
    };

    getData();
  }, []);

  const onDeleteHandler = async () => {
    if (window.confirm("작성 글을 삭제하시겠습니까?")) {
      await instance.delete(`/api/auth/post/${post_Id}`);
      alert("삭제되었습니다.");
      navigate("/");
    }
  };

  return (
    <LayoutPage>
      <Detail postDetail={postDetail} onDelete={onDeleteHandler} />
    </LayoutPage>
  );
}

export default DetailPage;
