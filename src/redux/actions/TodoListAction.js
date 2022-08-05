import Axios from "axios";
import { GET_TASK_API } from "../constants/TodoListConstants";

//dispatch mà có type nó là action reducer
//dispatch mà không có type nó là action thunk return về function

//action có 2 loại
//1. action thực thi ngay khi làm thay đổi reducer
//2. action phải thực hiện xử lý rôi mới gọi action1 thực thi (async action)
export const getTaskListApi = () => {
  //tiền xử lý dữ liệu => xử lý funcition
  return async (dispatch) => {
    let res = await Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });

    try {
      dispatch({
        type: GET_TASK_API,
        taskList: res.data,
      });
    } catch (error) {
      console.log(error);
    }

    // promise
    //   .then((result) => {
    //     dispatch({
    //       type: GET_TASK_API,
    //       taskList: result.data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data);
    //     alert(err.response.data);
    //   });
  };
};

export const addTaskApi = (taskName) => {
  return async (dispatch) => {
    let { data, status, ...res } = await Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: { taskName: taskName },
    });

    try {
      console.log("promise", res.data);
      dispatch(getTaskListApi());
    } catch (error) {
      console.log(error);
    }

    // promise
    //   .then((result) => {
    //     dispatch(getTaskListApi());
    //     // getTaskListApi(); nếu gọi hàm getTaskListApi() thì hàm này sẽ kh có xác định được dispatch để  có thể thực thi được hàm
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data);
    //     alert(err.response.data);
    //   });
  };
};

export const deleteTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/DeleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    promise
      .then((result) => {
        console.log(result.data);
        // getTaskList();
        dispatch(getTaskListApi());
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
  };
};

export const completeTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise
      .then((result) => {
        dispatch(getTaskListApi());
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
  };
};

export const rejectTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise
      .then((result) => {
        dispatch(getTaskListApi());
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
};
