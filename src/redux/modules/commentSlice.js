import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../api/request";
import { useCookies } from "react-cookie";

// export const getComments = createAsyncThunk("GET_COMMENTS", async (post_id) => {
// const res = await instance.get(`/api/post/{post_id}`);
export const getComments = createAsyncThunk("GET_COMMENTS", async () => {
  // const res = await instance.get(`/comments`); // 임시 🐥
  // console.log("getComments > ", res.data.data);
  // return res.data;
  return;
});

export const postComment = createAsyncThunk(
  "POST_COMMENT",
  async (postInfo) => {
    // const comment = {
    //   comment: postInfo.comment,
    // };
    // const res = await instance.post(
    //   `/api/auth/post/{postInfo.postId}/comment`,
    //   comment
    // );
    // console.log("postInfo :>> ", postInfo);
    // const res = await instance.post(`/comments`, postInfo);
    // console.log("postComment :>> ", res.data);
    // return res.data;
    return;
  }
);

export const deleteComment = createAsyncThunk(
  "DELETE_COMMENT",
  async (commentId) => {
    //   const res = await instance.delete(`/api/auth/post/comment/{comment_id}`);
    // const res = await instance.delete(`/comments/${commentId}`);
    // console.log("deleteComment :>> ", res);
    // return res.data;
    return;
  }
);

export const updateComment = createAsyncThunk(
  "UPDATE_COMMENT",
  async (updateInfo) => {
    // const res = await instance.put(
    //   `/api/auth/post/comment/${editInfo.comment_id}`,
    //   editInfo.comment
    // );
    //{
    //     “comment” : “댓글 내용”
    //}
    // const res = await instance.put(
    //   `/comments/${updateInfo.comment_id}`,
    //   updateInfo.comment
    // );
    // return res.data;
    return;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.fulfilled, (state, action) => {
      console.log("action.payload :>> ", action.payload);
      state.comments = [...action.payload];
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.commentId
      );
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.comments.map((comment) =>
        comment.id === action.payload.id
          ? (comment.content = action.payload)
          : comment.content
      );
    });
  },
});

export default commentSlice.reducer;
