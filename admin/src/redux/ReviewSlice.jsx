import { createSlice } from "@reduxjs/toolkit";

export const ReviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getReviewStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getReviewSuccess: (state, action) => {
      state.isFetching = false;
      state.reviews = action.payload;
    },
    getReviewFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteReviewStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteReviewSuccess: (state, action) => {
      state.isFetching = false;
      state.reviews.splice(
        state.reviews.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteReviewFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateReviewStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateReviewSuccess: (state, action) => {
      state.isFetching = false;
      state.reviews[
        state.reviews.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.review;
    },
    updateReviewFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addReviewStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addReviewSuccess: (state, action) => {
      state.isFetching = false;
      state.reviews.push(action.payload);
    },
    addReviewFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getReviewStart,
  getReviewSuccess,
  getReviewFailure,
  deleteReviewStart,
  deleteReviewSuccess,
  deleteReviewFailure,
  updateReviewStart,
  updateReviewSuccess,
  updateReviewFailure,
  addReviewStart,
  addReviewSuccess,
  addReviewFailure,
} = ReviewSlice.actions;

export default ReviewSlice.reducer;
