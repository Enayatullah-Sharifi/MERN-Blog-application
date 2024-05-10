import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {
    createCommentStart: (state) => {
      state.isLoading = true;
    },
    createCommentSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.comments.unshift(action.payload);
    },
    createCommentFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // get All Comments
    getCommentStart: (state) => {
      state.isLoading = true;
    },
    getCommentSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.comments = action.payload.data.map((c) => ({
        comment: c.comment,
        _id: c._id,
        user: c.user,
      }));
    },
    getCommentFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createCommentStart,
  createCommentSuccess,
  createCommentFailure,
  getCommentStart,
  getCommentSuccess,
  getCommentFailure,
} = commentSlice.actions;
export default commentSlice.reducer;
