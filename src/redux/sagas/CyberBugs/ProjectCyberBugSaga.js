import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { cyberBugService } from "../../../services/CyberBugService";
import projectService from "../../../services/ProjectService";
import { NotifiFunction } from "../../../util/Notification/NotificationCyberbugs";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/LoadingConstants";

function* createProject(action) {
  yield put({
    type: DISPLAY_LOADING,
  });

  // yield delay(500);
  try {
    const { data, status } = yield call(() =>
      cyberBugService.createProjectCategoryAuthorize(action.projectCategory)
    );

    let navigate = yield select((state) => state.NavigateReducer.navigate);

    navigate("/projectManagement");
  } catch (error) {
    console.log(error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* takeActionCreateProject() {
  yield takeLatest("CREATE_PROJECT_SAGA", createProject);
}

//getAll Projetc from API
function* getAllProject(action) {
  try {
    const { data, status } = yield call(() => cyberBugService.getAllProject());

    yield put({
      type: "GET_USER_BY_PROJECTID_SAGA",
      projectId: data.content[0].id,
    });

    yield put({
      type: "GET_ALL_PROJECT",
      projectList: data.content,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* takeActionGetAllProject() {
  yield takeLatest("GET_ALL_PROJECT_SAGA", getAllProject);
}

//edit project from API
function* editProject(action) {
  yield put({
    type: DISPLAY_LOADING,
  });

  // yield delay(500);
  try {
    const { data, status } = yield call(() =>
      cyberBugService.editProject(action.projectEdit)
    );

    // yield put({
    //   type: "GET_ALL_PROJECT_SAGA",
    // });
    yield call(getAllProject);
    yield put({
      type: "CLOSE_DRAWER",
    });
  } catch (error) {
    console.log(error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* takeActionEditProject() {
  yield takeLatest("EDIT_PROJECT_SAGA", editProject);
}

//delete project from API
function* deleteProject(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      // projectService.deleteProject(action.projectDeleteId)
      cyberBugService.deleteProject(action.projectDeleteId)
    );
    NotifiFunction("success", "Delete project success");

    yield call(getAllProject);
  } catch (error) {
    console.log(error);
    NotifiFunction("error", "Delete project fail!");
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* takeActionDeleteProject() {
  yield takeLatest("DELETE_PROJECT_SAGA", deleteProject);
}

//get project detail from API
function* getProjectDetail(action) {
  try {
    const { data, status } = yield call(() =>
      cyberBugService.getProjectDetail(action.projectId)
    );

    yield put({
      type: "GET_PROJECT_DETAIL",
      projectDetail: data.content,
    });
  } catch (error) {
    console.log(error);
    let navigate = yield select((state) => state.NavigateReducer.navigate);
    navigate("/projectManagement");
  }
}

export function* takeActionGetProjectDetail() {
  yield takeLatest("GET_PROJECT_DETAIL_SAGA", getProjectDetail);
}
