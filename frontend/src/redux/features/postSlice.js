import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  error: null,
  isLoading: false,
  usersPosts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // POST new Post
    postStart: (state) => {
      state.isLoading = true;
    },
    postSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.posts.push(action.payload);
    },
    postFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Get All Post
    getPostStart: (state) => {
      state.isLoading = true;
    },
    getPostSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.posts = action.payload.map((post) => {
        return {
          ...post,
        };
      });
    },
    getPostFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Get Users Posts
    getUsersPostsStart: (state) => {
      state.isLoading = true;
    },
    getUsersPostsSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.usersPosts = action.payload.map((post) => ({ ...post }));
    },
    getUsersPostsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Delete Users Posts
    deleteUsersPostsStart: (state) => {
      state.isLoading = true;
    },
    deleteUsersPostsSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      const index = state.usersPosts.findIndex(
        (post) => post._id === action.payload._id
      );
      if (index !== -1) {
        state.usersPosts.splice(index, 1);
      }
    },
    deleteUsersPostsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

  },
});

export const {
  postStart,
  postSuccess,
  postFailure,
  getPostStart,
  getPostSuccess,
  getPostFailure,
  getUsersPostsFailure,
  getUsersPostsSuccess,
  getUsersPostsStart,
  deleteUsersPostsStart,
  deleteUsersPostsSuccess,
  deleteUsersPostsFailure,
} = postSlice.actions;
export default postSlice.reducer;
