import axios from "axios";
import { deleted } from "../actions";
const deleteCompleted = (completed) => {
  return async (dispatch) => {
    await completed.forEach(async (todo) => {
      await axios.delete(`/todos/${todo.id}`);
      dispatch(deleted(todo.id));
    });
  };
};

export default deleteCompleted;
