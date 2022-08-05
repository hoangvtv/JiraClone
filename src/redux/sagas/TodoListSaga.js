// export function* rootSaga() là 1 generator function
//redux 2 loại action: action thường và action trả về  function(sủ dụng middleware)

import {
  fork,
  takeEvery,
  call,
  put,
  take,
  delay,
  takeLatest,
} from "redux-saga/effects";
import Axios from "axios";
import { todoListServices } from "../../services/TodoListServices";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConstants";
import {
  GET_TASK_API,
  GET_TASKLIST_API,
  ADD_TASK_API,
  COMPLETE_TASK_API,
  REJECT_TASK_API,
  DELETE_TASK_API,
} from "../constants/TodoListConstants";

//acion lấy danh sách tab từ API
function* getTaskListApi(action) {
  // while (true) {
  //   yield take("getTaskListApi"); ///theo dõi action -> xem action nào dispatch đến mới làm công việc bên dưới
  //   console.log("getTaskListApiAction");
  //   //xử lý gọi api
  // }
  // yield delay(3000);
  // console.log("getTaskListApi", action);

  //   let result = yield call(() => {
  //     return Axios({
  //       url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
  //       method: "GET",
  //     });
  //   });

  //put giống dispatch action
  yield put({
    type: DISPLAY_LOADING,
  });

  try {
    let { data, status } = yield call(todoListServices.getTaskListApi);

    yield delay(1000);

    //Sau khi lấy giá trị thành công  dùng put giống dispatch
    yield put({ type: GET_TASK_API, taskList: data });
  } catch (error) {
    console.log(error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* takeActionGetTaskListApi() {
  yield takeLatest(GET_TASKLIST_API, getTaskListApi);
}

//action thêm task
function* addTaskApiAction(action) {
  //gọi api
  try {
    yield call(() => {
      return todoListServices.addTaskApi(action.taskName);
    });

    //thành công thì load lại taskList = cách gọi lại action getTaskListApi
    yield put({ type: GET_TASKLIST_API });
  } catch (error) {
    console.log(error);
  }
}

export function* takeActionAddTaskApi() {
  yield takeLatest(ADD_TASK_API, addTaskApiAction);
}

//action check task
function* completeTaskApi(action) {
  //gọi api
  try {
    yield call(() => {
      return todoListServices.completeTaskApi(action.taskName);
    });

    //thành công thì load lại taskList = cách gọi lại action getTaskListApi
    yield put({ type: GET_TASKLIST_API });
  } catch (error) {
    console.log(error);
  }
}
export function* takeActionCompleteTaskApi() {
  yield takeLatest(COMPLETE_TASK_API, completeTaskApi);
}

//action reject task
function* rejectTaskApi(action) {
  //gọi api
  try {
    yield call(() => {
      return todoListServices.rejectTaskApi(action.taskName);
    });

    //thành công thì load lại taskList = cách gọi lại action getTaskListApi
    yield put({ type: GET_TASKLIST_API });
  } catch (error) {
    console.log(error);
  }
}

export function* takeActionRejectTaskApi() {
  yield takeLatest(REJECT_TASK_API, rejectTaskApi);
}

//action delete task
function* deleteTaskApi(action) {
  //gọi api
  try {
    yield call(() => {
      return todoListServices.deleteTaskApi(action.taskName);
    });

    //thành công thì load lại taskList = cách gọi lại action getTaskListApi
    yield put({ type: GET_TASKLIST_API });
  } catch (error) {
    console.log(error);
  }
}

export function* takeActionDeleteTaskApi() {
  yield takeLatest(DELETE_TASK_API, deleteTaskApi);
}
