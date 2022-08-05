const initialState = {
  taskTypeList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_TASK_TYPE": {
      return { ...state, taskTypeList: action.taskTypeList };
    }

    default:
      return state;
  }
};
