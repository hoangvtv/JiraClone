import { call, put, select, takeLatest } from "redux-saga/effects";
import { TaskService } from "../../../services/TaskService";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/LoadingConstants";
import { NotifiFunction } from "../../../util/Notification/NotificationCyberbugs";

function* createTaskSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      TaskService.createTask(action.task)
    );

    yield put({
      type: "CLOSE_DRAWER",
    });

    NotifiFunction("success", "Create task successfully");
  } catch (error) {
    console.log(error);
    NotifiFunction("error", "Create task failed");
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* takeActionCreateTask() {
  yield takeLatest("CREATE_TASK_SAGA", createTaskSaga);
}

function* getTaskDetailSaga(action) {
  try {
    const { data, status } = yield call(() =>
      TaskService.getTaskDetail(action.taskId)
    );

    yield put({
      type: "GET_TASK_DETAIL",
      taskDetail: data.content,
    });

    // yield put({
    //   type: "GET_PROJECT_DETAIL_SAGA",
    //   projectId: data.content.projectId,
    // });
  } catch (error) {
    console.log(error);
  }
}

export function* takeActionGetTaskDetail() {
  yield takeLatest("GET_TASK_DETAIL_SAGA", getTaskDetailSaga);
}

function* updateTaskStatusSaga(action) {
  try {
    const { data, status } = yield call(() =>
      TaskService.updateStatusTask(action.taskStatusUpdate)
    );

    yield put({
      type: "GET_PROJECT_DETAIL_SAGA",
      projectId: action.taskStatusUpdate.projectId,
    });

    yield put({
      type: "GET_TASK_DETAIL_SAGA",
      taskId: action.taskStatusUpdate.taskId,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* takeActionUpdateTaskStatus() {
  yield takeLatest("UPDATE_TASK_STATUS_SAGA", updateTaskStatusSaga);
}

function* updateTaskSaga(action) {
  try {
    const { data, status } = yield call(() =>
      TaskService.updateTask(action.task)
    );

    // yield put({
    //   type: "GET_TASK_DETAIL_SAGA",
    //   taskId: action.taskStatusUpdate.taskId,
    // });
  } catch (error) {
    console.log(error);
  }
}

export function* takeActionUpdateTask() {
  yield takeLatest("UPDATE_TASK_SAGA", updateTaskSaga);
}

function* handleChange_postAPI(action) {
  //gọi action làm thay đổi taskDetail
  switch (action.actionType) {
    case "CHANGE_TASK_DETAIL": {
      const { value, name } = action;
      yield put({
        type: "CHANGE_TASK_DETAIL",
        name,
        value,
      });
      break;
    }

    case "CHANGE_ASSIGNESS": {
      yield put({
        type: "CHANGE_ASSIGNESS",
        userSelected: action.userSelected,
      });
      break;
    }

    case "REMOVE_USER_ASSIGN": {
      yield put({
        type: "REMOVE_USER_ASSIGN",
        userId: action.userId,
      });
      break;
    }
  }
  //save qua api updateTaskSaga

  //lấy dữ lieuj từ state.taskDetail
  let { taskDetail } = yield select((state) => state.TaskReducer);

  //biến đổi dữ liệu taskDetail thành dữ lieuj api cần

  const listUserAsign = taskDetail.assigness?.map((user, index) => {
    return user.id;
  });
  const taskUpdateApi = {
    ...taskDetail,
    listUserAsign,
  };

  try {
    const { data, status } = yield call(() =>
      TaskService.updateTask(taskUpdateApi)
    );

    yield put({
      type: "GET_PROJECT_DETAIL",
      projectId: taskUpdateApi.projectId,
    });

    yield put({
      type: "GET_TASK_DETAIL_SAGA",
      taskId: taskUpdateApi.taskId,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* takeActionHandleChange_postAPI() {
  yield takeLatest("HANDLE_CHANGE_POST_API_SAGA", handleChange_postAPI);
}
