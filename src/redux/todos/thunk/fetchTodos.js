import axios from "axios";
import { loaded } from "../actions";

const fetchTodos = async (dispatch) => {
  const { data } = await axios("/todos");
  dispatch(loaded(data));
};

export default fetchTodos;
