import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../features/filter/filterSlice";
import { fetchTags } from "../../features/tags/tagsSlice";
import Tag from "./Tag";

export default function Tags() {
  const { tags } = useSelector((state) => state.tags);
  const dispatch = useDispatch();
  const { searchRef } = useSelector((state) => state.filter);
  const {
    tags: selectedTags,
    search,
    author,
  } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  return tags?.length > 0 ? (
    <section className="flex justify-between max-w-7xl mx-auto">
      <div className="px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto">
        {tags.map((tag) => (
          <Tag key={tag.id} title={tag.title} />
        ))}
      </div>
      <div className=" px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto">
        <button
          disabled={selectedTags.length === 0 && search === "" && author === ""}
          className="bg-red-400 text-white px-4 py-1 rounded-full disabled:bg-gray-200 disabled:text-gray-500"
          onClick={() => {
            dispatch(reset());
            searchRef.current.value = "";
          }}
        >
          Reset
        </button>
      </div>
    </section>
  ) : null;
}
