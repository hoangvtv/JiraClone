const initialState = {
  visible: false,
  ComponentContentDrawer: <p> Default Component Content Drawer </p>,
  callBackSubmit: () => {
    alert("Default CallBack Submit");
  },
  title: "Default Title",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_DRAWER": {
      return {
        ...state,
        visible: true,
      };
    }
    case "CLOSE_DRAWER": {
      return {
        ...state,
        visible: false,
      };
    }
    case "OPEN_MODAL_EDIT_PROJECT": {
      return {
        ...state,
        visible: true,
        ComponentContentDrawer: action.ComponentContentDrawer,
        title: action.title,
      };
    }

    case "SET_SUBMIT_EDIT_PROJECT": {
      return {
        ...state,
        callBackSubmit: action.submitFunction,
      };
    }

    case "OPEN_FORM_CREATE_TASK": {
      return {
        ...state,
        visible: true,
        ComponentContentDrawer: action.ComponentContentDrawer,
        title: action.title,
      };
    }

    case "SET_SUBMIT_CREATE_TASK": {
      return {
        ...state,
        callBackSubmit: action.submitFunction,
      };
    }
    default:
      return state;
  }
};
