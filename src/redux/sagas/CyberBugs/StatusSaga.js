import { call, put, takeLatest } from "redux-saga/effects";
import { StatusService } from "../../../services/StatusService";

function* getAllStatus(action) {
  try {
    const { data, status } = yield call(() => StatusService.getAllStatus());

    yield put({
      type: "GET_ALL_STATUS",
      statusList: data.content,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* takeActionGetAllStatus() {
  yield takeLatest("GET_ALL_STATUS_SAGA", getAllStatus);
}
