import axios from "axios";
import { deleted } from "../actions";
const deleteTodo = (todoId) => {
  return async (dispatch) => {
    await axios.delete(`/todos/${todoId}`);

    dispatch(deleted(todoId));
  };
};

export default deleteTodo;
