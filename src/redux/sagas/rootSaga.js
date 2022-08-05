import {
  fork,
  takeEvery,
  call,
  put,
  take,
  delay,
  takeLatest,
  all,
} from "redux-saga/effects";
import * as TodoListSaga from "./TodoListSaga";
import * as CyberBugSaga from "./CyberBugs/UserCyberBugSaga";
import * as ProjectCategorySaga from "./CyberBugs/ProjectCategorySaga";
import * as ProjectSaga from "./CyberBugs/ProjectCyberBugSaga";
import * as UserCyberBugSaga from "./CyberBugs/UserCyberBugSaga";
import * as TaskTypeSaga from "./CyberBugs/TaskTypeSaga";
import * as PrioritySaga from "./CyberBugs/PrioritySaga";
import * as TaskSaga from "./CyberBugs/TaskSaga";
import * as StatusSaga from "./CyberBugs/StatusSaga";

export function* rootSaga() {
  yield all([
    //nghiệp vụ theo dõi  các action saga todolist
    TodoListSaga.takeActionGetTaskListApi(),
    TodoListSaga.takeActionAddTaskApi(),
    TodoListSaga.takeActionCompleteTaskApi(),
    TodoListSaga.takeActionRejectTaskApi(),
    TodoListSaga.takeActionDeleteTaskApi(),
    CyberBugSaga.takeActionSignIn(),
    ProjectCategorySaga.takeActionGetAllProjectCategory(),
    ProjectSaga.takeActionCreateProject(),
    ProjectSaga.takeActionGetAllProject(),
    ProjectSaga.takeActionEditProject(),
    ProjectSaga.takeActionDeleteProject(),
    UserCyberBugSaga.takeActionGetUser(),
    UserCyberBugSaga.takeActionRegister(),
    UserCyberBugSaga.takeActionAddUserProject(),
    UserCyberBugSaga.takeActionDeleteUserProject(),
    ProjectSaga.takeActionGetProjectDetail(),
    TaskTypeSaga.takeActionGetAllTaskType(),
    PrioritySaga.takeActionGetAllPriority(),
    TaskSaga.takeActionCreateTask(),
    StatusSaga.takeActionGetAllStatus(),
    UserCyberBugSaga.takeActionGetUserProjectId(),
    TaskSaga.takeActionGetTaskDetail(),
    TaskSaga.takeActionUpdateTaskStatus(),
    TaskSaga.takeActionUpdateTask(),
    TaskSaga.takeActionHandleChange_postAPI(),
  ]);
}
