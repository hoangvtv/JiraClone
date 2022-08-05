import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function TodoListRFC() {
  let [state, setState] = useState({
    taskList: [],
    values: { taskName: "" },
    errors: { taskName: "" },
  });

  const getTaskList = () => {
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    promise
      .then((result) => {
        setState({
          ...state,
          taskList: result.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
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
    return state.taskList
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
    return state.taskList
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

    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: { taskName: state.values.taskName },
    });
    promise
      .then((result) => {
        getTaskList();

        setState({
          ...state,
          values: { taskName: "" },
          errors: { taskName: "" },
        });
        console.log(state);
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
  };

  //delete task
  const deleteTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/DeleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    promise
      .then((result) => {
        console.log(result.data);
        getTaskList();
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
  };
  //done task
  const completeTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise
      .then((result) => {
        console.log(result.data);
        getTaskList();
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
  };

  //reject task
  const rejectTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise
      .then((result) => {
        console.log(result.data);
        getTaskList();
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
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
