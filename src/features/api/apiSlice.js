import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { todoId } from "../../utils/todoId";

export const apiSlice = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://redux-fake-server.glitch.me/",
  }),
  endpoints: ({ query, mutation }) => ({
    getTodos: query({
      query: ({ completed } = {}) => {
        let query = "";

        if (typeof completed === "boolean") {
          query = `?completed_like=${completed}&`;
        }
        return `todos${query}`;
      },
      providesTags: ["todos"],
    }),
    getTodo: query({
      query: (id) => `todos/${id}`,
      providesTags: (params) => {
        console.log(params);
        return [{ type: "todo", id: params.arg.id }];
      },
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
