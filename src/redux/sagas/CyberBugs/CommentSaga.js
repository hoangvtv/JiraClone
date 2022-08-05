import { CommentService } from "../../../services/CommentService";
import {
  GET_ALL_COMMENT,
  INSERT_COMMENT,
} from "../../constants/CyberBugs/CommentContants";

function* getAllComment(action) {
  try {
    const { data, status } = yield call(() =>
      CommentService.getAllComment(action.taskId)
    );
  } catch (error) {
    console.log(error);
  }
}

export function* takeActionGetAllComment() {
  yield takeLatest(GET_ALL_COMMENT, getAllComment);
}

function* insertComment(action) {
  try {
    const response = yield call(CommentService.insertComment, action.comment);
    yield put({
      type: GET_ALL_COMMENT,
      taskId: action.comment.taskId,
    });
  } catch (error) {
    yield put(insertCommentFailure(error));
  }
}

export function* takeActionInsertComment() {
  yield takeEvery(INSERT_COMMENT, insertComment);
}
