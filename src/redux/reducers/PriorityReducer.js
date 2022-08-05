const initialState = {
  priorityList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_PRIORITY": {
      return { ...state, priorityList: action.priorityList };
    }
    default:
      return state;
  }
};
