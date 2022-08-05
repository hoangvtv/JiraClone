import React, { Component } from "react";
import Axios from "axios";
import style from "./TodoList.css";

export default class TodoList extends Component {
  state = {
    taskList: [],
    values: { taskName: "" },
    errors: { taskName: "" },
  };

  getTaskList = () => {
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });

    promise.then((result) => {
      console.log(result);
      //Nếu gọi api lấy về kết quả thành công
      //=> set lại state của component
      this.setState({
        taskList: result.data,
      });

      console.log("thành công");
    });
    promise.catch((err) => {
      console.log("thất bại");

      console.log(err.response.data);
    });
  };

  renderTaskToDo = () => {
    return this.state.taskList
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
                  this.deleteTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  this.completeTask(item.taskName);
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

  renderTaskToDoDone = () => {
    return this.state.taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                onClick={() => {
                  this.deleteTask(item.taskName);
                }}
                type="button"
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  this.rejectTask(item.taskName);
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

  //hàm sẽ tự động thực thi sau khi component render
  componentDidMount() {
    this.getTaskList();
  }

  handleChange = (e) => {
    let { value, name } = e.target;
    console.log(value, name);
    let newValues = { ...this.state.values };

    newValues = { ...newValues, [name]: value };

    let newErrors = { ...this.state.errors };

    let regexString = /^[a-z A-Z]+$/;

    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " invalid !";
    } else {
      newErrors[name] = "";
    }

    this.setState({
      ...this.state,
      values: newValues,
      errors: newErrors,
    });
  };

  //add task
  addTask = (e) => {
    e.preventDefault();

    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      //   data: this.state.values,
      data: { taskName: this.state.values.taskName },
    });
    promise
      .then((result) => {
        this.getTaskList();
        this.setState({
          values: { taskName: "" },
          errors: { taskName: "" },
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
  };

  //delete task
  deleteTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/DeleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    promise
      .then((result) => {
        console.log(result.data);
        this.getTaskList();
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
  };
  //done task
  completeTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise
      .then((result) => {
        console.log(result.data);
        this.getTaskList();
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
  };

  //reject task
  rejectTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise
      .then((result) => {
        console.log(result.data);
        this.getTaskList();
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
  };

  render() {
    return (
      <form onSubmit={this.addTask}>
        <button
          onClick={() => {
            this.getTaskList();
          }}
        >
          Get task list
        </button>
        <div className="card">
          <div className="card__header">
            <img src={require("./bg.png")} />
          </div>
          {/* <h2>hello!</h2> */}
          <div className="card__body">
            <div className="card__content">
              <div className="form-group">
                {" "}
                <div className="card__title">
                  <h2>My Tasks</h2>
                  <p>September 9,2020</p>
                </div>
                <div className="card__add">
                  <input
                    name="taskName"
                    id="newTask"
                    type="text"
                    placeholder="Enter an activity..."
                    onChange={this.handleChange}
                    value={this.state.values.taskName}
                  />
                  <button id="addItem" onClick={this.addTask}>
                    <i className="fa fa-plus" />
                  </button>
                </div>
                <p className="text text-danger">
                  {" "}
                  {this.state.errors.taskName}
                </p>
              </div>

              <div className="card__todo form-group">
                {/* Uncompleted tasks */}
                <ul className="todo" id="todo">
                  {this.renderTaskToDo()}
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                  {this.renderTaskToDoDone()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
