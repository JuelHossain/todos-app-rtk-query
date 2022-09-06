import axios from "axios";
import { colorSelected } from "../actions";

const updateColor = (todoId, color) => {
  return async (dispatch) => {
    const { data } = await axios.patch(`/todos/${todoId}`, {
      color: color,
    });

    dispatch(colorSelected(data.id, data.color));
  };
};

export default updateColor;
