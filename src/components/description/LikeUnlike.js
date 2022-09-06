import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import likeImage from "../../assets/like.svg";
import unlikeImage from "../../assets/unlike.svg";
import {
  fetchLikeUnlike,
  patchLike,
  patchUnLike,
} from "../../features/likeUnlike/likeUnlikeSlice";

export default function LikeUnlike({ id }) {
  const { likes, unlikes, isLoading } = useSelector(
    (state) => state.likeUnlike
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLikeUnlike(id));
  }, [dispatch, id]);

  return (
    !isLoading && (
      <div className="flex gap-10 w-48">
        <div className="flex gap-1">
          <div
            className="shrink-0"
            onClick={() => {
              dispatch(patchLike({ id, likes: likes + 1 }));
            }}
          >
            <img className="w-5 block" src={likeImage} alt="Like" />
          </div>
          <div className="text-sm leading-[1.7142857] text-slate-600">
            {likes}
          </div>
        </div>
        <div className="flex gap-1">
          <div
            className="shrink-0"
            onClick={() => {
              dispatch(patchUnLike({ id, unlikes: unlikes + 1 }));
            }}
          >
            <img className="w-5 block" src={unlikeImage} alt="Unlike" />
          </div>
          <div className="text-sm leading-[1.7142857] text-slate-600">
            {unlikes}
          </div>
        </div>
      </div>
    )
  );
}
