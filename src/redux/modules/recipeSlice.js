import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../api/request";
import { useCookies } from "react-cookie";

export const likeRecipe = createAsyncThunk("LIKE_RECIPE", async () => {
  // const res = await instance.get(`/comments`); // 임시 🐥
  // console.log("getComments > ", res.data.data);
  // return res.data;
  return;
});

// export const likeRecipe = async (postId) => {
//     const res = await instance.post(`/api/auth/post/${postId}`);
//     console.log("like > ", res);
//   };

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
  },
});

export default commentSlice.reducer;
