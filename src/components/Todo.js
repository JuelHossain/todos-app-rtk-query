import { useState } from "react";
import cancelImage from "../assets/images/cancel.png";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "../features/api/apiSlice";

export default function Todo({ todo }) {
  const { text, id, completed, color } = todo;
  const [editTodo, { isLoading }] = useEditTodoMutation();

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      <CompleteButton
        completed={completed}
        id={id}
        editTodo={editTodo}
        loading={isLoading}
      />

      {isEdit ? (
        // edit form
        <EditForm
          completed={completed}
          id={id}
          setIsEdit={setIsEdit}
          text={text}
          editTodo={editTodo}
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

function CompleteButton({ completed, id, editTodo, loading }) {
  return (
    <div
      className={`relative rounded-full bg-white border-2 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
        completed
          ? "border-green-500 focus-within:border-green-500"
          : "border-gray-400"
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
      {loading ? (
        <svg
          class="inline w-full h-full text-gray-200 animate-spin dark:text-green-500 fill-black"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      ) : (
        // tick button
        completed && (
          <svg
            className="fill-current w-3 h-3 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )
      )}
    </div>
  );
}

function EditForm({ completed, setIsEdit, text, id, editTodo }) {
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
  const [editTodo, { isLoading }] = useEditTodoMutation();

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
    >
      {isLoading && (
        <svg
          class={`w-full h-full text-${bColor}-100 animate-spin  fill-${bColor}-500`}
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      )}
    </div>
  );
}

function DeleteButton({ id }) {
  const [deleteTodo, { isLoading }] = useDeleteTodoMutation();
  return isLoading ? (
    <div className="w-4 h-4 flex items-center justify-center">
      <svg
        class="w-full h-full text-red-500 animate-spin  fill-black"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  ) : (
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
