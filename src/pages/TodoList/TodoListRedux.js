import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { GET_TASK_API } from "../../redux/constants/TodoListConstants";
import {
  addTaskApi,
  completeTaskApi,
  deleteTaskApi,
  getTaskListApi,
  rejectTaskApi,
} from "../../redux/actions/TodoListAction";

export default function TodoListRedux(props) {
  const { taskList } = useSelector((state) => state.TodoListReducer);
  const dispatch = useDispatch();

  let [state, setState] = useState({
    values: { taskName: "" },
    errors: { taskName: "" },
  });

  const getTaskList = () => {
    dispatch(getTaskListApi());
  };

  useEffect(() => {
    getTaskList();

    return () => {
      console.log("unmount");
    };
  }, []);

  const handleChange = (e) => {
    let { value, name } = e.target;
    console.log(value, name);
    let newValues = { ...state.values };

    newValues = { ...newValues, [name]: value };

    let newErrors = { ...state.errors };

    let regexString = /^[a-z A-Z]+$/;

    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " invalid !";
    } else {
      newErrors[name] = "";
    }

    setState({
      ...state,
      values: newValues,
      errors: newErrors,
    });
  };

  const renderTaskToDo = () => {
    return taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  deleteTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  completeTask(item.taskName);
                }}
              >
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  const renderTaskToDoDone = () => {
    return taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                onClick={() => {
                  deleteTask(item.taskName);
                }}
                type="button"
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  rejectTask(item.taskName);
                }}
              >
                <i className="far fa-undo" />
                <i className="fas fa-undo" />
              </button>
            </div>
          </li>
        );
      });
  };

  //add task
  const addTask = (e) => {
    e.preventDefault();
    console.log(state.values.taskName);

    //xử lý  dữ liệu từ người dùng => gọi aciton asktask
    dispatch(addTaskApi(state.values.taskName));
  };

  //delete task
  const deleteTask = (taskName) => {
    dispatch(deleteTaskApi(taskName));
  };
  //done task
  const completeTask = (taskName) => {
    dispatch(completeTaskApi(taskName));
  };

  //reject task
  const rejectTask = (taskName) => {
    dispatch(rejectTaskApi(taskName));
  };

  return (
    <div className="card">
      <div className="card__header">
        <img src={require("./bg.png")} />
      </div>
      {/* <h2>hello!</h2> */}
      <form
        className="card__body"
        onSubmit={(event) => {
          addTask(event);
        }}
      >
        <div className="card__content">
          <div className="card__title">
            <h2>My Tasks</h2>
            <p>September 9,2020</p>
          </div>
          <div className="card__add">
            <input
              id="newTask"
              type="text"
              placeholder="Enter an activity..."
              name="taskName"
              value={state.values.taskName}
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <button
              id="addItem"
              type="submit"
              onClick={(event) => {
                addTask(event);
              }}
            >
              <i className="fa fa-plus" />
            </button>
          </div>
          <div className="card__todo">
            {/* Uncompleted tasks */}
            <ul className="todo" id="todo">
              {renderTaskToDo()}
            </ul>
            {/* Completed tasks */}
            <ul className="todo" id="completed">
              {renderTaskToDoDone()}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}
