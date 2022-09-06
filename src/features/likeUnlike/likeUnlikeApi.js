import axios from "../../utils/axios";

export const getLikeUnlike = async (id) => {
  const { data } = await axios.get(`/videos/${id}`);
  const { likes, unlikes } = data;
  return { likes, unlikes };
};
export const increaseLike = async (id, likes) => {
  await axios.patch(`/videos/${id}`, { likes });
};
export const increaseUnLike = async (id, unlikes) => {
  await axios.patch(`/videos/${id}`, { unlikes });
};
