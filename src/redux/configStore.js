import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import TodoListReducer from "./reducers/TodoListReducer";
import LoadingReducer from "./reducers/LoadingReducer";
import ModalReducer from "./reducers/ModalReducer";
import NavigateReducer from "./reducers/NavigateReducer";

// middleware saga
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import UserCyberBugsReducers from "./reducers/UserCyberBugsReducers";
import ProjectCategoryReducers from "./reducers/ProjectCategoryReducer";
import ProjectCyberBugsReducers from "./reducers/ProjetCyberBugsReducer";
import DrawerCyberBugsReducers from "./reducers/DrawerCyberBugsReducers";
import TaskTypeReducer from "./reducers/TaskTypeReducer";
import PriorityReducer from "./reducers/PriorityReducer";
import StatusReducer from "./reducers/StatusReducer";
import TaskReducer from "./reducers/TaskReducer";

const middleware = createSagaMiddleware();

const rootReducer = combineReducers({
  // reducers
  TodoListReducer,
  LoadingReducer,
  ModalReducer,
  NavigateReducer,
  UserCyberBugsReducers,
  ProjectCategoryReducers,
  ProjectCyberBugsReducers,
  DrawerCyberBugsReducers,
  TaskTypeReducer,
  PriorityReducer,
  StatusReducer,
  TaskReducer,
});

// các middleware ngăn cách nhau bởi dấu phẩy
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, middleware)
);

//gọi saga
middleware.run(rootSaga);

export default store;
