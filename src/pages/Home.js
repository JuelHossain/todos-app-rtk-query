import { useSelector } from "react-redux";
import VideoGrid from "../components/grid/VideoGrid";

import Tags from "../components/tags/Tags";
import Pagination from "../components/ui/Pagination";
export default function Home() {
  const { pageRequired } = useSelector((state) => state.filter);
  return (
    <>
      <Tags />
      <VideoGrid />
      {pageRequired && <Pagination />}
    </>
  );
}
