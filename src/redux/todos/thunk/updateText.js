import axios from "axios";
import { edited } from "../actions";

const updateText = (todoId, newText) => {
  return async (dispatch) => {
    const { data } = await axios.patch(`/todos/${todoId}`, {
      text: newText,
    });

    dispatch(edited(data.id, newText));
  };
};

export default updateText;
