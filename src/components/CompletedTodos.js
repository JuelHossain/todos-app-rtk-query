import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchTodos from "../redux/todos/thunk/fetchTodos";
import Todo from "./Todo";

export default function CompletedTodos() {
  const todos = useSelector((state) =>
    state.todos.filter((todo) => todo.completed)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos);
  }, [dispatch]);

  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto ">
      {todos.map((todo) => (
        <Todo isCompleted todo={todo} key={todo.id} />
      ))}
    </div>
  );
}
