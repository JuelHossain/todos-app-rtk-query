import axios from "../../utils/axios";

export const getVideos = async (tags, search, author) => {
  let queryString = "";

  if (tags?.length > 0) {
    queryString += tags.map((tag) => `tags_like=${tag}`).join("&");
  }

  if (search !== "") {
    queryString += `&q=${search}`;
  }

  if (author !== "") {
    queryString = `author_like=${author}`;
  }

  const { data } = await axios.get(`/videos/?${queryString}`);

  return data;
};

export const getPagiVideos = async (page, limit) => {
  const { data } = await axios.get(`/videos/?_page=${page}&_limit=${limit}`);
  return data;
};

export const getVideoCount = async () => {
  const { data } = await axios.get("/videos");
  return data.length;
};


