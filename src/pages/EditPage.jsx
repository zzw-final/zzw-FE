import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance, imgInstance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import EditHeader from "../components/edit/EditHeader";
import EditTitle from "../components/edit/EditTitle";

function EditPage() {
  const post_Id = useParams().id;
  const navigate = useNavigate();
  const [postDetail, setPostDetail] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await instance.get(`/api/post/${post_Id}`);
      setPostDetail(data?.data.data);
    };

    getData();
  }, []);

  console.log("디테일페이지 값", postDetail);

  return (
    <LayoutPage>
      <EditHeader />
      <EditTitle />
    </LayoutPage>
  );
}

export default EditPage;
