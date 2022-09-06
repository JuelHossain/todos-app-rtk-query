import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../features/filter/filterSlice";
import { fetchVideosCount } from "../../features/videos/videosSlice";

export default function Pagination() {
  const dispatch = useDispatch();
  const { totalVideos } = useSelector((state) => state.videos);
  const { page } = useSelector((state) => state.filter);
  const pageCount = parseInt(totalVideos / 3);
  useEffect(() => {
    dispatch(fetchVideosCount());
  }, [dispatch]);
  return (
    <section className="pt-12">
      <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 justify-end">
        {[...Array(pageCount).keys()].map((num, index) => (
          <button
            key={Math.random()}
            className={
              index + 1 === page
                ? "bg-blue-600 text-white px-4 py-1 rounded-full"
                : "bg-blue-200 text-blue-500 px-4 py-1 rounded-full"
            }
            onClick={(e) => {
              dispatch(setPage(parseInt(e.target.innerText)));
            }}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
