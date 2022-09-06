import { getLikeUnlike, increaseLike, increaseUnLike } from "./likeUnlikeApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  likes: 0,
  unlikes: 0,
  isLoading: false,
  isError: false,
  error: "",
};

// async thunk
export const fetchLikeUnlike = createAsyncThunk(
  "likeUnlike/fetchLikeUnlike",
  async (id) => {
    const likeUnlike = await getLikeUnlike(id);
    return likeUnlike;
  }
);
export const patchLike = createAsyncThunk(
  "likeUnlike/patchLike",
  async ({ id, likes }) => {
    await increaseLike(id, likes);
    return likes;
  }
);
export const patchUnLike = createAsyncThunk(
  "likeUnlike/patchUnLike",
  async ({ id, unlikes }) => {
    await increaseUnLike(id, unlikes);
    return unlikes;
  }
);

const likeUnlikeSlice = createSlice({
  name: "videos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikeUnlike.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchLikeUnlike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likes = action.payload.likes;
        state.unlikes = action.payload.unlikes;
      })
      .addCase(fetchLikeUnlike.rejected, (state, action) => {
        state.isLoading = false;
        state.likes = 0;
        state.unlikes = 0;
        state.isError = true;
        state.error = action.error?.message;
      })

      .addCase(patchLike.fulfilled, (state, action) => {
        state.likes = action.payload;
      })
      .addCase(patchUnLike.fulfilled, (state, action) => {
        state.unlikes = action.payload;
      });
  },
});
export default likeUnlikeSlice.reducer;
