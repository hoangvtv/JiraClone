import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

export default function ContentMain(props) {
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    //gọi api cập nhập status
    const { source, destination } = result;
    let { projectId, taskId } = JSON.parse(result.draggableId);

    if (!result.destination) {
      return;
    } else if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    dispatch({
      type: "UPDATE_TASK_STATUS_SAGA",
      taskStatusUpdate: {
        taskId: taskId,
        statusId: result.destination.droppableId,
        projectId: projectId,
      },
    });
  };
  const renderTaskList = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {props.projectDetail.lstTask?.map((taskListDetail, index) => {
          return (
            <Droppable droppableId={taskListDetail.statusId} key={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="card pb-2"
                  key={index}
                  style={{ width: "17rem", height: "auto" }}
                >
                  <div className="card-header">{taskListDetail.statusName}</div>
                  <ul
                    className="list-group list-group-flush"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    key={index}
                  >
                    {taskListDetail.lstTaskDeTail.map((task, index) => {
                      return (
                        <Draggable
                          key={task.taskId.toString()}
                          index={index}
                          draggableId={JSON.stringify({
                            projectId: task.projectId,
                            taskId: task.taskId,
                          })}
                        >
                          {(provided) => {
                            return (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                key={index}
                                className="list-group-item"
                                data-toggle="modal"
                                data-target="#infoModal"
                                onClick={() => {
                                  dispatch({
                                    type: "GET_TASK_DETAIL_SAGA",
                                    taskId: task.taskId,
                                  });
                                }}
                              >
                                <p className="font-weight-300">
                                  {task.taskName}
                                </p>
                                <div
                                  className="block"
                                  style={{ display: "flex" }}
                                >
                                  <div className="block-left">
                                    <p className="text-danger">
                                      {task.priorityTask.priority}
                                    </p>
                                  </div>
                                  <div className="block-right">
                                    <div
                                      className="avatar-group"
                                      style={{ display: "flex" }}
                                    >
                                      {task.assigness.map((mem, index) => {
                                        return (
                                          <div className="avatar" key={index}>
                                            <img
                                              src={mem.avatar}
                                              alt={mem.avatar}
                                            />
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                </div>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
  };

  return (
    <div className="content" style={{ display: "flex" }}>
      {/* <div
        className="card"
        // style={{ width: "17rem", height: "25rem" }}
      >
        <div className="card-header">BACKLOG 3</div>
        <ul className="list-group list-group-flush">
          <li
            className="list-group-item"
            data-toggle="modal"
            data-target="#infoModal"
            style={{ cursor: "pointer" }}
          >
            <p>
              Each issue has a single reporter but can have multiple assignees
            </p>
            <div className="block" style={{ display: "flex" }}>
              <div className="block-left">
                <i className="fa fa-bookmark" />
                <i className="fa fa-arrow-up" />
              </div>
              <div className="block-right">
                <div className="avatar-group" style={{ display: "flex" }}>
                  <div className="avatar">
                    <img
                      src={require("../../../assets/img/download (1).jfif")}
                      alt="1"
                    />
                  </div>
                  <div className="avatar">
                    <img
                      src={require("../../../assets/img/download (2).jfif")}
                      alt="2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <p>
              Each issue has a single reporter but can have multiple assignees
            </p>
            <div className="block" style={{ display: "flex" }}>
              <div className="block-left">
                <i className="fa fa-check-square" />
                <i className="fa fa-arrow-up" />
              </div>
              <div className="block-right">
                <div className="avatar-group" style={{ display: "flex" }}>
                  <div className="avatar">
                    <img
                      src={require("../../../assets/img/download (1).jfif")}
                      alt="1"
                    />
                  </div>
                  <div className="avatar">
                    <img
                      src={require("../../../assets/img/download (2).jfif")}
                      alt="2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
      <div
        className="card"
        // style={{ width: "17rem", height: "25rem",  }}
      >
        <div className="card-header">SELECTED FOR DEVELOPMENT 2</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
        </ul>
      </div>
      <div
        className="card"

        // style={{ width: "17rem", height: "25rem" }}
      >
        <div className="card-header">IN PROGRESS 2</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
        </ul>
      </div>
      <div
        className="card"
        // style={{ width: "17rem", height: "25rem" }}
      >
        <div className="card-header">DONE 3</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div> */}

      {renderTaskList()}
    </div>
  );
}
