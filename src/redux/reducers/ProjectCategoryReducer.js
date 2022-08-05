import { GET_ALL_PROJECT_CATEGORY } from "../constants/CyberBugs/CyberBugsContants";

const initialState = {
  arrProjectCategory: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_CATEGORY: {
      return {
        ...state,
        arrProjectCategory: action.arrProjectCategory,
      };
    }
    default:
      return state;
  }
};
