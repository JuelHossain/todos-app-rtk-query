import { useDispatch, useSelector } from "react-redux";
import cancelImage from "../assets/images/cancel.png";
import tickImage from "../assets/images/double-tick.png";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "../features/api/apiSlice";
import { addColor, removeColor } from "../features/filter/filterSlice";

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
  const { data: todos, isLoading } = useGetTodosQuery(
    completed ? { completed: true } : { completed: false }
  );
  const { colors } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [deleteTodo] = useDeleteTodoMutation();
  const [editTodo] = useEditTodoMutation();

  const deleteCompletedTodos = (todos) => {
    todos.forEach((todo) => deleteTodo(todo.id));
  };
  const completeAllTodos = (todos) => {
    todos.forEach((todo) =>
      editTodo({ id: todo.id, data: { completed: true } })
    );
  };
  const handleColorChange = (color) => {
    if (colors.includes(color)) {
      dispatch(removeColor(color));
    } else {
      dispatch(addColor(color));
    }
  };
  console.log(colors);

  if (completed) {
    return (
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <p>{isLoading || numberOfTodos(todos?.length)} Completed</p>
        <ul className="flex space-x-1 items-center text-xs gap-3">
          <li
            className="flex space-x-1 cursor-pointer"
            onClick={() => deleteCompletedTodos(todos)}
          >
            <img className="w-4 h-4" src={cancelImage} alt="Complete" />
            <span>Delete All Completed Tasks</span>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <p>{isLoading || numberOfTodos(todos.length)} left</p>
        <ul className="flex space-x-1 items-center text-xs gap-3">
          <li
            className="flex space-x-1 cursor-pointer"
            onClick={() => completeAllTodos(todos)}
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
