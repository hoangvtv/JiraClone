import {
  fork,
  takeEvery,
  call,
  put,
  take,
  delay,
  takeLatest,
  select,
} from "redux-saga/effects";
import Axios from "axios";
import {
  USER_REGISTER_API,
  USER_SIGNIN_API,
  US_LOGIN,
} from "../../constants/CyberBugs/CyberBugsContants";
import { cyberBugService } from "../../../services/CyberBugService";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/LoadingConstants";
import { TOKEN, USER_LOGIN } from "../../../util/constants/system";
import userService from "../../../services/UserService";
import { NotifiFunction } from "../../../util/Notification/NotificationCyberbugs";

//quản lý các action saga

function* signIn(action) {
  yield delay(1000);

  yield put({
    type: DISPLAY_LOADING,
  });

  try {
    const { data, status } = yield call(() =>
      cyberBugService.signinCyberBugs(action.userLogin)
    );

    //Lưu vào localstorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    let navigate = yield select((state) => state.NavigateReducer.navigate);
    navigate("/");

    yield put({
      type: US_LOGIN,
      userLogin: data.content,
    });
  } catch (error) {
    console.log(error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* takeActionSignIn() {
  yield takeLatest(USER_SIGNIN_API, signIn);
}

function* register(action) {
  yield delay(500);

  yield put({
    type: DISPLAY_LOADING,
  });

  try {
    console.log("action", action.userRegister);
    const { data, status } = yield call(() =>
      cyberBugService.registerCyberBug(action.userRegister)
    );

    let navigate = yield select((state) => state.NavigateReducer.navigate);
    navigate("/login");
    yield put({
      type: HIDE_LOADING,
    });
    NotifiFunction("success", "Register success");
  } catch (error) {
    console.log(error);
    NotifiFunction("error", "Register fail");
    yield put({
      type: HIDE_LOADING,
    });
  }
}

export function* takeActionRegister() {
  yield takeLatest(USER_REGISTER_API, register);
}

function* getUserSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.getUser(action.keyword)
    );

    yield put({
      type: "GET_USER_SEARCH",
      userSearchs: data.content,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* takeActionGetUser() {
  yield takeLatest("GET_USER_API", getUserSaga);
}

function* addUserProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );

    yield put({
      type: "GET_ALL_PROJECT_SAGA",
    });

    NotifiFunction("success", "Assign user success");
  } catch (error) {
    console.log(error);
    NotifiFunction("error", "Assign user fail");
  }
}

export function* takeActionAddUserProject() {
  yield takeLatest("ADD_MEMBER_PROJECT_SAGA", addUserProjectSaga);
}

function* deleteUserProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.deleteUserFromProject(action.projectDelete)
    );

    yield put({
      type: "GET_ALL_PROJECT_SAGA",
    });

    NotifiFunction("success", "Delete user success");
  } catch (error) {
    console.log(error);
    NotifiFunction("error", "Delete user fail");
  }
}

export function* takeActionDeleteUserProject() {
  yield takeLatest("DELETE_MEMBER_PROJECT_SAGA", deleteUserProjectSaga);
}

function* getUserByProjectIdSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.getUserByProjectId(action.projectId)
    );

    yield put({
      type: "GET_USER_PROJECT_BY_ID",
      arrayUserProject: data.content,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: "GET_USER_PROJECT_BY_ID",
      arrayUserProject: [],
    });
  }
}

export function* takeActionGetUserProjectId() {
  yield takeLatest("GET_USER_BY_PROJECTID_SAGA", getUserByProjectIdSaga);
}
