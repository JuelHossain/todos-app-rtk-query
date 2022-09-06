import { useState } from "react";
import cancelImage from "../assets/images/cancel.png";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "../features/api/apiSlice";

export default function Todo({ todo }) {
  const { text, id, completed, color } = todo;

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      <CompleteButton completed={completed} id={id} />

      {isEdit ? (
        // edit form
        <EditForm
          completed={completed}
          id={id}
          setIsEdit={setIsEdit}
          text={text}
        />
      ) : (
        <Text completed={completed} text={text} />
      )}

      <EditButton setIsEdit={setIsEdit} />

      <ColorButton color={color} id={id} bColor="green" />

      <ColorButton color={color} id={id} bColor="yellow" />

      <ColorButton color={color} id={id} bColor="red" />

      <DeleteButton id={id} />
    </div>
  );
}

function CompleteButton({ completed, id }) {
  const [editTodo] = useEditTodoMutation();

  return (
    <div
      className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
        completed && "border-green-500 focus-within:border-green-500"
      }`}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() =>
          editTodo({
            id,
            data: {
              completed: !completed,
            },
          })
        }
        className="opacity-0 absolute rounded-full"
      />
      {completed && ( // tick button
        <svg
          className="fill-current w-3 h-3 text-green-500 pointer-events-none"
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      )}
    </div>
  );
}

function EditForm({ completed, setIsEdit, text, id }) {
  const [editTodo] = useEditTodoMutation();
  const [newText, setNewText] = useState(text);

  return (
    <form
      className={`select-none flex-1 ${completed && "line-through"}`}
      onSubmit={(e) => {
        e.preventDefault();
        editTodo({
          id,
          data: {
            text: newText,
          },
        });
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
  );
}

function EditButton({ setIsEdit }) {
  return (
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
  );
}

function ColorButton({ color, id, bColor }) {
  const [editTodo] = useEditTodoMutation();

  return (
    <div
      className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-${bColor}-500 border-${bColor}-500 ${
        color === bColor && `bg-${bColor}-500`
      }`}
      onClick={() =>
        editTodo({
          id,
          data: {
            color: bColor,
          },
        })
      }
    ></div>
  );
}

function DeleteButton({ id }) {
  const [deleteTodo] = useDeleteTodoMutation();
  return (
    <img
      src={cancelImage}
      className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
      alt="Cancel"
      onClick={() => deleteTodo(id)}
    />
  );
}

function Text({ completed, text }) {
  return (
    <div className={`select-none flex-1 p-1 ${completed && "line-through"}`}>
      {text}
    </div>
  );
}
