import axios from "axios";
import { added } from "../actions";
const addTodo = (todoText) => {
  return async (dispatch) => {
    const { data } = await axios.post("/todos", {
      text: todoText,
      completed: false,
    });

    dispatch(added(data.text));
  };
};

export default addTodo;
