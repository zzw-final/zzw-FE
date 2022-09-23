import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../api/request";

export const getComments = createAsyncThunk("GET_COMMENTS", async (postId) => {
  const res = await instance.get(`/api/post/${postId}`);
  return res.data.success ? res.data.data.commentList : res.data.error;
});

export const postComment = createAsyncThunk(
  "POST_COMMENT",
  async (postInfo) => {
    const comment = {
      comment: postInfo.comment,
    };
    const res = await instance.post(
      `/api/auth/post/${postInfo.postId}/comment`,
      comment
    );
    const storeData = {
      ...res.data.data,
      postId: postInfo.postId,
      profile: postInfo.profile,
    };
    return res.data.success ? storeData : res.data.error;
  }
);

export const deleteComment = createAsyncThunk(
  "DELETE_COMMENT",
  async (commentId) => {
    const res = await instance.delete(`/api/auth/post/comment/${commentId}`);
    return res.data.success ? commentId : res.data.error;
  }
);

export const updateComment = createAsyncThunk(
  "UPDATE_COMMENT",
  async (updateInfo) => {
    const comment = {
      comment: updateInfo.comment,
    };
    const res = await instance.put(
      `/api/auth/post/comment/${updateInfo.commentId}`,
      comment
    );
    return res.data.success ? updateInfo : res.data.error;
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
      state.comments = [...action.payload];
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.comments.unshift(action.payload);
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.commentId !== action.payload
      );
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.comments.map((comment) =>
        comment.commentId === action.payload.commentId
          ? (comment.comment = action.payload.comment)
          : comment.comment
      );
    });
  },
});

export default commentSlice.reducer;
