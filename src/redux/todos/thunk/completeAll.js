import axios from "axios";
import { allCompleted } from "../actions";

const completeAll = (inCompletedTodo) => {
  return async (dispatch) => {
    await inCompletedTodo.forEach(async (todo) => {
      await axios.patch(`/todos/${todo.id}`, {
        completed: true,
      });

      dispatch(allCompleted());
    });
  };
};

export default completeAll;
