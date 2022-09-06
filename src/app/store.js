import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filter/filterSlice";
import LikeUnlikeReducer from "../features/likeUnlike/likeUnlikeSlice";
import relatedVideosReducer from "../features/relatedVideos/relatedVideosSlice";
import tagsReducer from "../features/tags/tagsSlice";
import videoReducer from "../features/video/videoSlice";
import videosReducer from "../features/videos/videosSlice";

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    tags: tagsReducer,
    video: videoReducer,
    relatedVideos: relatedVideosReducer,
    filter: filterReducer,
    likeUnlike: LikeUnlikeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
