import { useEffect } from "react";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { searched, setSearchRef } from "../../features/filter/filterSlice";

export default function Search() {
  const dispatch = useDispatch();

  const match = useMatch("/");
  const navigate = useNavigate();

  const debounce = useCallback((fn) => {
    let timer;
    return (e) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn(e);
      }, 500);
    };
  }, []);
  const handleChange = (e) => {
    dispatch(searched(e.target.value));
    if (!match) {
      navigate("/");
    }
  };
  const handleDebounce = debounce(handleChange);
  useEffect(() => {
    dispatch(setSearchRef(searchRef));
  }, [dispatch]);
  const searchRef = useRef();
  return (
    <input
      ref={searchRef}
      className="outline-none border-none mr-2"
      type="search"
      name="search"
      placeholder="Search"
      onChange={handleDebounce}
    />
  );
}
