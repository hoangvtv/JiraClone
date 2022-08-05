import { call, delay, put, takeLatest } from "redux-saga/effects";
import { cyberBugService } from "../../../services/CyberBugService";
import { GET_ALL_PROJECT_CATEGORY } from "../../constants/CyberBugs/CyberBugsContants";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/LoadingConstants";

function* getAllProjectCategory(action) {
  try {
    const { data, status } = yield call(() =>
      cyberBugService.getAllProjectCategory()
    );

    yield put({
      type: GET_ALL_PROJECT_CATEGORY,
      arrProjectCategory: data.content,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* takeActionGetAllProjectCategory() {
  yield takeLatest("GET_ALL_PROJECT_CATEGORY_SAGA", getAllProjectCategory);
}
