import { toggled } from "../actions";
import axios from 'axios';

const updateStatus = (todoId, currentStatus) => {
    return async (dispatch) => {
        const {data} = await axios.patch(`/todos/${todoId}`, {
          completed: !currentStatus,
        });


        dispatch(toggled(data.id));
    };
};

export default updateStatus;
