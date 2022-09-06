import { useGetTodosQuery } from "../features/api/apiSlice";
import Todo from "./Todo";

export default function CompletedTodos() {
  const {
    data: todos,
    isLoading,
    isError,
  } = useGetTodosQuery({ completed: true });

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && isError) {
    content = <p>There was an Server Side Error!</p>;
  }
  if (!isLoading && !isError && todos.length > 0) {
    content = todos.map((todo) => (
      <Todo isCompleted todo={todo} key={todo.id} />
    ));
  }
  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto ">
      {content}
    </div>
  );
}
