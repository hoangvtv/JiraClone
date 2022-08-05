import Axios from "axios";
import { DOMAIN } from "../util/constants/system";

export class TodoListServices {
  constructor() {}

  getTaskListApi = () => {
    return Axios({
      url: `${DOMAIN}/ToDoList/GetAllTask`,
      method: "GET",
    });
  };

  addTaskApi = (taskName) => {
    return Axios({
      url: `${DOMAIN}/ToDoList/AddTask`,
      method: "POST",
      data: {
        taskName: taskName,
      },
    });
  };

  completeTaskApi = (taskName) => {
    return Axios({
      url: `${DOMAIN}/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
  };

  rejectTaskApi = (taskName) => {
    return Axios({
      url: `${DOMAIN}/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
  };

  deleteTaskApi = (taskName) => {
    return Axios({
      url: `${DOMAIN}/ToDoList/DeleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
  };
}

export const todoListServices = new TodoListServices();
