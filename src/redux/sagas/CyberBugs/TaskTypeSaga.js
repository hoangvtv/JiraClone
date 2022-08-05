import { TaskTypesServices } from "../../../services/TaskTypesServices";
import { call, put, takeLatest } from "redux-saga/effects";

function* getAllTaskType(action) {
  try {
    const { data, status } = yield call(() =>
      TaskTypesServices.getAllTaskTypes()
    );

    yield put({
      type: "GET_ALL_TASK_TYPE",
      taskTypeList: data.content,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* takeActionGetAllTaskType() {
  yield takeLatest("GET_ALL_TYPE_TASK_SAGA", getAllTaskType);
}
