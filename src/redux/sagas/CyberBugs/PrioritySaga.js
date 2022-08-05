import { call, put, takeLatest } from "redux-saga/effects";
import { PriorityServices } from "../../../services/PriorityService";

function* getAllPriority(action) {
  try {
    const { data, status } = yield call(() =>
      PriorityServices.getAllPriority()
    );

    yield put({
      type: "GET_ALL_PRIORITY",
      priorityList: data.content,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* takeActionGetAllPriority() {
  yield takeLatest("GET_ALL_PRIORITY_SAGA", getAllPriority);
}
