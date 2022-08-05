const initialState = {
  projectList: [],
  projectEdit: {
    id: 0,
    projectName: "string",
    creator: 0,
    description: "string",
    categoryId: "string",
  },
  projectDetail: {},

  arrayProject: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_PROJECT": {
      return {
        ...state,
        projectList: action.projectList,
        arrayProject: action.projectList,
      };
    }

    case "EDIT_PROJECT": {
      return {
        ...state,
        projectEdit: action.projectEdit,
      };
    }

    case "GET_PROJECT_DETAIL": {
      return {
        ...state,
        projectDetail: action.projectDetail,
      };
    }

    default:
      return state;
  }
};
