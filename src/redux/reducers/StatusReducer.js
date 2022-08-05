const initialState = {
  statusList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_STATUS":
      return { ...state, statusList: action.statusList };

    default:
      return state;
  }
};
