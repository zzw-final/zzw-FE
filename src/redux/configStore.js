import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./modules/commentSlice";

const store = configureStore({
  reducer: {
    comment: commentSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
