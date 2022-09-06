import { useState } from "react";
import cancelImage from "../assets/images/cancel.png";
import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "../features/api/apiSlice";

export default function Header() {
  return (
    <>
      <AddTodoForm />
      <OperationButtons />
    </>
  );
}

function AddTodoForm() {
  const [input, setInput] = useState("");

  const [addTodo] = useAddTodoMutation();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (input !== "") {
      addTodo(input);
      setInput("");
    }
  };
  return (
    <form
      className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
      onSubmit={submitHandler}
    >
      <img src={noteImage} className="w-6 h-6" alt="Add todo" />
      <input
        type="text"
        placeholder="Type your todo"
        className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
        value={input}
        onChange={handleInput}
      />
      <button
        type="submit"
        className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
      ></button>
    </form>
  );
}

function OperationButtons() {
  const { data: incompletedTodos } = useGetTodosQuery({
    status: "Incompleted",
  });
  const { data: completedTodos } = useGetTodosQuery({
    status: "Completed",
  });

  const [deleteTodo] = useDeleteTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const deleteCompletedTodos = () => {
    completedTodos.forEach((todo) => deleteTodo(todo.id));
  };
  const completeAllTodos = () => {
    incompletedTodos.forEach((todo) =>
      editTodo({ id: todo.id, data: { completed: true } })
    );
  };

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <button
        className="flex space-x-1 cursor-pointer"
        onClick={completeAllTodos}
      >
        <img className="w-4 h-4" src={tickImage} alt="Complete" />
        <span>Complete All Tasks</span>
      </button>
      <button
        className="flex space-x-1 cursor-pointer"
        onClick={deleteCompletedTodos}
      >
        <img className="w-4 h-4" src={cancelImage} alt="Complete" />
        <span>Delete All Completed Tasks</span>
      </button>
    </div>
  );
}
