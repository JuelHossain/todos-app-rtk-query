import { useDispatch, useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/api/apiSlice";
import {
  addColor,
  removeColor,
  setStatus,
} from "../features/filter/filterSlice";
import { numberOfTodos } from "../utils/numberOfTodos";

export default function Footer() {
  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <States />
      <div className="flex gap-3">
        <StatusFilter />
        <ColorFilter />
      </div>
    </div>
  );
}

function ColorFilter() {
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.filter);
  const handleColorChange = (color) => {
    if (colors.includes(color)) {
      dispatch(removeColor(color));
    } else {
      dispatch(addColor(color));
    }
  };

  return (
    <ul className="flex space-x-1 items-center text-xs gap-3">
      <li
        className={`h-4 w-4 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
          colors.includes("green") && "bg-green-500"
        }`}
        onClick={() => handleColorChange("green")}
      ></li>
      <li
        className={`h-4 w-4 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
          colors.includes("red") && "bg-red-500"
        }`}
        onClick={() => handleColorChange("red")}
      ></li>
      <li
        className={`h-4 w-4 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
          colors.includes("yellow") && "bg-yellow-500"
        }`}
        onClick={() => handleColorChange("yellow")}
      ></li>
    </ul>
  );
}

function States() {
  const { data: incompleteTodos, isLoading } = useGetTodosQuery({
    status: "Incompleted",
  });

  return (
    <div className="flex gap-2">
      <p>
        {isLoading
          ? "Loading..."
          : numberOfTodos(incompleteTodos?.length, "Incomplete")}
      </p>
    </div>
  );
}

function StatusFilter() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.filter);
  const changeStatus = (e) => {
    dispatch(setStatus(e.target.innerText));
  };
  return (
    <div className="flex gap-1">
      <button
        onClick={changeStatus}
        className={status === "All" && "font-bold "}
      >
        All
      </button>
      |
      <button
        onClick={changeStatus}
        className={status === "Completed" && "font-bold "}
      >
        Completed
      </button>
      |
      <button
        onClick={changeStatus}
        className={status === "Incompleted" && "font-bold "}
      >
        Incompleted
      </button>
    </div>
  );
}
