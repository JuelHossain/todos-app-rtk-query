import { useState } from "react";
import cancelImage from "../assets/images/cancel.png";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "../features/api/apiSlice";

export default function Todo({ todo, isCompleted }) {
  const [editTodo] = useEditTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const { text, id, completed, color } = todo;

  const [isEdit, setIsEdit] = useState(false);
  const [newText, setNewText] = useState(text);

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      <div
        className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed && "border-green-500 focus-within:border-green-500"
        }`}
      >
        <input
          type="checkbox"
          checked={completed}
          onChange={() => editTodo({ id, data: { completed: !completed } })}
          className="opacity-0 absolute rounded-full"
        />
        {completed && (
          <svg
            className="fill-current w-3 h-3 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      {isEdit ? (
        <form
          className={`select-none flex-1 ${completed && "line-through"}`}
          onSubmit={(e) => {
            e.preventDefault();
            editTodo({ id, data: { text: newText } });
            setIsEdit(false);
          }}
        >
          <input
            type="text"
            value={newText}
            onChange={(e) => {
              setNewText(e.target.value);
            }}
            onBlur={(e) => {
              setIsEdit(false);
            }}
            autoFocus={true}
            className="w-full border-2 p-1"
          />
        </form>
      ) : (
        <div
          className={`select-none flex-1 p-1 ${completed && "line-through"}`}
        >
          {text}
        </div>
      )}

      {isCompleted || (
        <>
          <div
            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer
        `}
            onClick={() => {
              setIsEdit((edit) => !edit);
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
          </div>
          <div
            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
              color === "green" && "bg-green-500"
            }`}
            onClick={() => editTodo({ id, data: { color: "green" } })}
          ></div>

          <div
            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
              color === "yellow" && "bg-yellow-500"
            }`}
            onClick={() => editTodo({ id, data: { color: "yellow" } })}
          ></div>

          <div
            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
              color === "red" && "bg-red-500"
            }`}
            onClick={() => editTodo({ id, data: { color: "red" } })}
          ></div>
        </>
      )}

      <img
        src={cancelImage}
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Cancel"
        onClick={() => deleteTodo(id)}
      />
    </div>
  );
}
