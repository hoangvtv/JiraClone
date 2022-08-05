import { USER_LOGIN } from "../../util/constants/system";
import { US_LOGIN } from "../constants/CyberBugs/CyberBugsContants";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: usLogin,
  userSearchs: [],
  arrayUserProject: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case US_LOGIN: {
      return {
        ...state,
        userLogin: action.userLogin,
      };
    }
    case "GET_USER_SEARCH": {
      return {
        ...state,
        userSearchs: action.userSearchs,
      };
    }

    case "GET_USER_PROJECT_BY_ID": {
      return {
        ...state,
        arrayUserProject: action.arrayUserProject,
      };
    }

    default:
      return state;
  }
};
