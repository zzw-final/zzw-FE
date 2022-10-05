import React, { useEffect, useState } from "react";
import { instance } from "../api/request";
import styled from "styled-components";
import LayoutPage from "../components/common/LayoutPage";
import Logo from "../components/common/Logo";
import Main from "../components/main/Main";
import SearchForm from "../components/main/SearchForm";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";

const MainPage = () => {
  const navigate = useNavigate();

  const [bestPost, setBestPost] = useState([]);
  const [recentPost, setRecentPost] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [followPost, setFollowPost] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await instance.get(`/api/post`);
      if (result.data.success && result.data.error === null) {
        setBestPost(result.data.data.bestPost);
        setRecentPost(result.data.data.recentPost);
        setTagList(result.data.data.tagList);
        setFollowPost(result.data.data.followPost);
      }
    }
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   console.log("요청...");
  //   return await instance.get(`/api/post`);
  // };

  // const { data: bestPost } = useQuery(["allList"], fetchData, {
  //   select: (data) => data.data.data.bestPost,
  //   cacheTime: 0,
  // });
  // const { data: recentPost } = useQuery(["allList"], fetchData, {
  //   select: (data) => data.data.data.recentPost,
  //   cacheTime: 0,
  // });
  // const { data: followPost } = useQuery(["allList"], fetchData, {
  //   select: (data) => data.data.data.followPost,
  //   cacheTime: 0,
  // });
  // const { data: tagList } = useQuery(["allList"], fetchData, {
  //   select: (data) => data.data.data.tagList,
  //   cacheTime: 0,
  // });

  const likeToggle = async (postId) => {
    return await instance.post(`/api/auth/post/${postId}`);
  };

  // const queryClient = useQueryClient();

  // const { mutate } = useMutation(likeToggle, {
  //   onSuccess: (result, context) => {
  //     // 위의 파라미터 찍어보기
  //     queryClient.invalidateQueries(["allList"]);
  //   },
  // });

  // const { mutate } = useMutation(likeToggle, {
  //   onMutate: async (postId) => {
  //     await queryClient.cancelQueries(["allList"]);
  //     const previousData = queryClient.getQueryData(["allList"]);
  // queryClient.setQueryData(["allList"], (prevData) => {
  // console.log("prevData :>> ", prevData?.data?.data.bestPost);
  // return prevData?.data?.data.bestPost.map((post) =>
  //   post.postId === postId ? { ...post, isLike: !post.isLike } : post
  // );
  // return prevData;
  // });
  //     return { previousData };
  //   },
  //   onError: (err, context) => {
  //     queryClient.setQueryData(["allList"], context.previousData);
  //   },
  // });

  // onSuccess: (result, context) => {
  // 위의 파라미터 찍어보기
  //   queryClient.invalidateQueries(["allList"]);
  // },

  console.log("recentPost ", recentPost);

  const search = async (searchOption, sendData) => {
    navigate(`/search?${searchOption}=${sendData}`);
  };

  return (
    <LayoutPage backgroundMain={"--color-orange"}>
      <Logo />
      <SearchForm mainSearch={search} />
      <MainContainer>
        <Main
          bestPost={bestPost}
          recentPost={recentPost}
          tagList={tagList}
          followPost={followPost}
          likeToggle={likeToggle}
          search={search}
          // mutate={mutate}
        />
      </MainContainer>
    </LayoutPage>
  );
};

const MainContainer = styled.div`
  display: block;
`;

export default MainPage;
//
