import { getPagiVideos, getVideoCount, getVideos } from "./videosAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  filteredVideos: [],
  videos: [],
  isLoading: false,
  isError: false,
  error: "",
  totalVideos: 0,
};

// async thunk
export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async ({ tags, search, author }) => {
    const videos = await getVideos(tags, search, author);
    return videos;
  }
);

export const fetchPagiVidoes = createAsyncThunk(
  "videos/fetchPagiVideos",
  async ({ page, limit }) => {
    const videos = await getPagiVideos(page, limit);
    return videos;
  }
);

export const fetchVideosCount = createAsyncThunk(
  "videos/fetchVideosCount",
  async () => {
    const count = await getVideoCount();
    return count;
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filteredVideos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.filteredVideos = [];
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(fetchVideosCount.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchVideosCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalVideos = action.payload;
      })
      .addCase(fetchVideosCount.rejected, (state, action) => {
        state.isLoading = false;
        state.videos = [];
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(fetchPagiVidoes.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchPagiVidoes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload;
      })
      .addCase(fetchPagiVidoes.rejected, (state, action) => {
        state.isLoading = false;
        state.videos = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});
export default videoSlice.reducer;
