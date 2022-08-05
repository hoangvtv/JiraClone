import Axios from "axios";
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/system";

export const TaskService = {
  createTask: (task) => {
    let newTask = {
      taskName: task.taskName,
      description: task.description,
      statusId: parseInt(task.statusId),
      priorityId: parseInt(task.priorityId),
      projectId: parseInt(task.projectId),
      originalEstimate: parseInt(task.originalEstimate),
      timeTrackingSpent: parseInt(task.timeTrackingSpent),
      timeTrackingRemaining: parseInt(task.timeTrackingRemaining),
      typeId: parseInt(task.typeId),
      listUserAsign: task.listUserAsign,
    };

    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/createTask`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
      data: newTask,
    });
  },

  getTaskDetail: (taskId) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/getTaskDetail?taskId=${taskId}`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },

  updateStatusTask: (taskStatusUpdate) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/updateStatus`,
      method: "PUT",
      data: taskStatusUpdate,
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },

  updateTask: (task) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/updateTask`,
      method: "POST",
      data: task,
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
};
