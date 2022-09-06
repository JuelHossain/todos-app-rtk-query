import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { todoId } from "../../utils/todoId";

export const apiSlice = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://redux-fake-server.glitch.me/",
  }),
  endpoints: ({ query, mutation }) => ({
    getTodos: query({
      query: ({ status, colors } = {}) => {
        let query = "";

        if (status === "Completed") {
          query += `completed_like=true&`;
        } else if (status === "Incompleted") {
          query += `completed_like=false&`;
        }
        if (colors?.length > 0) {
          query += colors.map((color) => `color_like=${color}`).join("&");
        }

        return query ? `todos?${query}` : "todos";
      },
      providesTags: ["todos"],
    }),
    addTodo: mutation({
      query: (text) => ({
        url: "todos",
        method: "POST",
        body: { text, completed: false, color: "", id: todoId() },
      }),
      invalidatesTags: ["todos"],
    }),
    editTodo: mutation({
      query: ({ id, data } = {}) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["todos"],
    }),
    deleteTodo: mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
