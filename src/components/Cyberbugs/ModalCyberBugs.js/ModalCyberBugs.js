import { Editor } from "@tinymce/tinymce-react";
import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import ReactHtmlParser from "react-html-parser";

export default function ModalCyberBugs() {
  const dispatch = useDispatch();

  const { taskDetail } = useSelector((state) => state.TaskReducer);
  const { statusList } = useSelector((state) => state.StatusReducer);
  const { priorityList } = useSelector((state) => state.PriorityReducer);
  const { taskTypeList } = useSelector((state) => state.TaskTypeReducer);
  let { projectDetail } = useSelector(
    (state) => state.ProjectCyberBugsReducers
  );

  const { timeTrackingSpent, timeTrackingRemaining } = taskDetail;
  const [visibleEditor, setVisibleEditor] = useState(false);
  const [historyContent, setHistoryConent] = useState(taskDetail.description);

  const [content, setContent] = useState(taskDetail.description);

  const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
  const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

  const [comment, setComment] = useState("");

  const renderDescription = () => {
    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              name="description"
              initialValue={taskDetail.description}
              init={{
                selector: "textarea#myTextArea",
                height: 400,

                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
  alignleft aligncenter alignright alignjustify | \
  bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: "HANDLE_CHANGE_POST_API_SAGA",
                  actionType: "CHANGE_TASK_DETAIL",
                  name: "description",
                  value: content,
                });

                setVisibleEditor(false);
              }}
            >
              Save
            </button>

            <button
              className="btn btn-primary"
              onClick={() => {
                setVisibleEditor(false);

                dispatch({
                  type: "HANDLE_CHANGE_POST_API_SAGA",
                  actionType: "CHANGE_TASK_DETAIL",
                  name: "description",
                  value: historyContent,
                });
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              setVisibleEditor(true);
              setHistoryConent(taskDetail.description);
            }}
            style={{
              cursor: "pointer",
            }}
          >
            {taskDetail.description}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    dispatch({ type: "GET_ALL_STATUS_SAGA" });
    dispatch({ type: "GET_ALL_PRIORITY_SAGA" });
    dispatch({ type: "GET_ALL_TYPE_TASK_SAGA" });
  }, []);

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetail;

    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="logged">{Number(timeTrackingRemaining)}h logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingSpent"
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingRemaining"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "HANDLE_CHANGE_POST_API_SAGA",
      actionType: "CHANGE_TASK_DETAIL",
      name,
      value,
    });
  };

  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark" />
              <select
                name="typeId"
                value={taskDetail.typeId}
                onChange={(e) => handleChange(e)}
              >
                {taskTypeList.map((taskType) => (
                  <option key={taskType.id} value={taskType.id}>
                    {taskType.taskType}
                  </option>
                ))}
              </select>
              {/* <span>{taskDetail.taskName}</span> */}
            </div>
            <div style={{ display: "flex" }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i
                className="fa fa-trash-alt='xyz'"
                style={{ cursor: "pointer" }}
              />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: Task.</p>
                  <div className="description">
                    <p>Description</p>
                    {renderDescription()}
                    {/* <p>{taskDetail.description}</p> */}
                  </div>
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img
                          src={require("../../../assets/img/download (1).jfif")}
                          alt="xyz"
                        />
                      </div>
                      <div className="input-comment">
                        <input
                          type="text"
                          placeholder="Add a comment ..."
                          value="comment"
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                        />

                        <div>
                          <span style={{ color: "#929398" }}>Add Comment</span>
                        </div>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        <div
                          className="display-comment"
                          style={{ display: "flex" }}
                        >
                          <div className="avatar">
                            <img
                              src={require("../../../assets/img/download (1).jfif")}
                              alt="xyz"
                            />
                          </div>
                          <div>
                            <p style={{ marginBottom: 5 }}>
                              Lord Gaben <span>a month ago</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Repellendus tempora ex
                              voluptatum saepe ab officiis alias totam ad
                              accusamus molestiae?
                            </p>
                            <div>
                              <span style={{ color: "#929398" }}>Edit</span>•
                              <span style={{ color: "#929398" }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      name="statusId"
                      className="custom-select"
                      value={taskDetail.statusId}
                      onChange={(e) => {
                        // const action = {
                        //   type: "UPDATE_TASK_STATUS_SAGA",
                        //   taskStatusUpdate: {
                        //     taskId: taskDetail.taskId,
                        //     statusId: e.target.value,
                        //   },
                        // };
                        // dispatch(action);

                        handleChange(e);
                      }}
                    >
                      {statusList.map((status, index) => {
                        return (
                          <option value={status.statusId} key={index}>
                            {status.statusName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div className="row">
                      {taskDetail.assigness.map((user, index) => {
                        return (
                          <div className="col-6  mt-2 mb-2" key={index}>
                            <div style={{ display: "flex" }} className="item">
                              <div className="avatar">
                                <img src={user.avatar} alt={user.avatar} />
                              </div>
                              <p className="name mt-1 ml-1">
                                {user.name}
                                <i
                                  className="fa fa-times"
                                  style={{ marginLeft: 5, cursor: "pointer" }}
                                  onClick={() => {
                                    dispatch({
                                      type: "HANDLE_CHANGE_POST_API_SAGA",
                                      actionType: "REMOVE_USER_ASSIGN",
                                      userId: user.id,
                                    });
                                  }}
                                />
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      <div className="col-6  mt-2 mb-2">
                        <Select
                          options={projectDetail.members
                            ?.filter((mem) => {
                              let index = taskDetail.assigness?.findIndex(
                                (us) => us.id === mem.userId
                              );
                              if (index !== -1) {
                                return false;
                              }
                              return true;
                            })
                            .map((mem, index) => {
                              return { value: mem.userId, label: mem.name };
                            })}
                          optionFilterProp="label"
                          style={{ width: "100%" }}
                          name="lstUser"
                          value="+ Add more"
                          className="form-control"
                          onSelect={(value) => {
                            if (value == "0") {
                              return;
                            }
                            let userSelected = projectDetail.members.find(
                              (mem) => mem.userId == value
                            );
                            userSelected = {
                              ...userSelected,
                              id: userSelected.userId,
                            };
                            //dispatchReducer

                            dispatch({
                              type: "HANDLE_CHANGE_POST_API_SAGA",
                              actionType: "CHANGE_ASSIGNESS",
                              userSelected,
                            });
                          }}
                        ></Select>
                      </div>
                    </div>
                  </div>

                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select
                      name="priorityId"
                      className="form-control"
                      value={taskDetail.priorityId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {priorityList.map((item, index) => {
                        return (
                          <option key={index} value={item.priorityId}>
                            {item.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      type="text"
                      name="originalEstimate"
                      className="estimate-hours"
                      value={taskDetail.originalEstimate}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
