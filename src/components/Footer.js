import { useDispatch, useSelector } from "react-redux";
import cancalImgae from "../assets/images/cancel.png";
import tickImage from "../assets/images/double-tick.png";
import { colorChanged } from "../redux/filters/actions";
import completeAll from "../redux/todos/thunk/completeAll";
import deleteCompleted from "../redux/todos/thunk/deleteCompleted";

const numberOfTodos = (no_of_todos) => {
  switch (no_of_todos) {
    case 0:
      return "No task";
    case 1:
      return "1 task";
    default:
      return `${no_of_todos} tasks`;
  }
};

export default function Footer({ completed }) {
  const todos = useSelector((state) => state.todos);
  const filters = useSelector((state) => state.filters);

  const dispatch = useDispatch();
  const taskTodo = todos.filter((todo) => !todo.completed);
  const taskCompleted = todos.filter((todo) => todo.completed);
  const { colors } = filters;

  const completeHandler = () => {
    dispatch(completeAll(taskTodo));
  };

  const deleteCompletedHandler = () => {
    dispatch(deleteCompleted(taskCompleted));
  };
  const handleColorChange = (color) => {
    if (colors.includes(color)) {
      dispatch(colorChanged(color, "removed"));
    } else {
      dispatch(colorChanged(color, "added"));
    }
  };

  if (completed) {
    return (
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <p>{numberOfTodos(taskCompleted.length)} Completed</p>
        <ul className="flex space-x-1 items-center text-xs gap-3">
          <li
            className="flex space-x-1 cursor-pointer"
            onClick={deleteCompletedHandler}
          >
            <img className="w-4 h-4" src={cancalImgae} alt="Complete" />
            <span>Delete All Completed Tasks</span>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <p>{numberOfTodos(taskTodo.length)} left</p>
        <ul className="flex space-x-1 items-center text-xs gap-3">
          <li
            className="flex space-x-1 cursor-pointer"
            onClick={completeHandler}
          >
            <img className="w-4 h-4" src={tickImage} alt="Complete" />
            <span>Complete All Tasks</span>
          </li>
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
      </div>
    );
  }
}
