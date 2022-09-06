const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  tags: [],
  search: "",
  searchRef: null,
  author: "",
  pageRequired: true,
  page: 1,
  limit: 4,
};

const filterSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    tagSelected: (state, action) => {
      state.tags.push(action.payload);
    },
    tagRemoved: (state, action) => {
      const indexToRemove = state.tags.indexOf(action.payload);

      if (indexToRemove !== -1) {
        state.tags.splice(indexToRemove, 1);
      }
    },
    searched: (state, action) => {
      state.search = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    setPageRequired: (state, action) => {
      state.pageRequired = action.payload;
    },
    reset: (state, action) => {
      state.tags = [];
      state.search = "";
      state.author = "";
    },
    setSearchRef: (state, action) => {
      state.searchRef = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const {
  tagSelected,
  tagRemoved,
  searched,
  setPage,
  setLimit,
  setAuthor,
  setPageRequired,
  reset,
  setSearchRef,
} = filterSlice.actions;
