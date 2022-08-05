import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { Select, Radio, Slider } from "antd";
import { useSelector, useDispatch, connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";

const { Option } = Select;

const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
function FormCreateTask(props) {
  const dispatch = useDispatch();

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = props;

  const { arrayProject } = useSelector(
    (state) => state.ProjectCyberBugsReducers
  );

  const { taskTypeList } = useSelector((state) => state.TaskTypeReducer);

  const { priorityList } = useSelector((state) => state.PriorityReducer);

  const { arrayUserProject } = useSelector(
    (state) => state.UserCyberBugsReducers
  );

  const { statusList } = useSelector((state) => state.StatusReducer);

  const userOption = arrayUserProject?.map((user, index) => {
    return { value: user.userId, label: user.name };
  });

  useEffect(() => {
    dispatch({ type: "GET_ALL_TYPE_TASK_SAGA" });
    dispatch({ type: "GET_ALL_PRIORITY_SAGA" });
    dispatch({ type: "GET_USER_API", keyword: "" });
    dispatch({ type: "GET_ALL_STATUS_SAGA" });
    dispatch({ type: "GET_ALL_PROJECT_SAGA" });
    dispatch({ type: "SET_SUBMIT_CREATE_TASK", submitFunction: handleSubmit });
  }, []);

  const [size, setSize] = useState("default");

  const [timeTracking, setTimetracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const children = [];

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <p>Project</p>
        <select
          name="projectId"
          className="form-control"
          onChange={(e) => {
            let { value } = e.target;

            dispatch({
              type: "GET_USER_BY_PROJECTID_SAGA",
              projectId: value,
            });
            setFieldValue("projectId", value);
          }}
        >
          {arrayProject.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <p>Task name</p>
        <input
          name="taskName"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <p>Status</p>
        <select
          name="statusId"
          className="form-control"
          onChange={handleChange}
        >
          {statusList.map((statusItem, index) => {
            return (
              <option key={index} value={statusItem.statusId}>
                {statusItem.statusName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priority</p>
            <select
              name="priorityId"
              className="form-control"
              onChange={handleChange}
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
          <div className="col-6">
            <p>Task type</p>
            <select
              className="form-control"
              name="typeId"
              onChange={handleChange}
            >
              {taskTypeList.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.taskType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Assignees</p>
            <Select
              mode="multiple"
              size={size}
              options={userOption}
              placeholder="Please select"
              onChange={(values) => {
                setFieldValue("listUserAsign", values);
              }}
              optionFilterProp="label"
              onSearch={(value) => {
                // console.log(value);
              }}
              style={{ width: "100%" }}
            >
              {children}
            </Select>
            <div className="row mt-3">
              <div className="col-12">
                <p>Original Estimate</p>
                <input
                  type="number"
                  min="0"
                  name="originalEstimate"
                  defaultValue="0"
                  className="form-control"
                  height="30"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <p>Time tracking</p>

            <Slider
              defaultValue={30}
              value={timeTracking.timeTrackingSpent}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
            />
            <div className="row">
              <div className="col-6 text-left font-weight-bold">
                {timeTracking.timeTrackingSpent}h logged
              </div>
              <div className="col-6 text-right font-weight-bold">
                {timeTracking.timeTrackingRemaining}h remaining
              </div>
            </div>
            <div className="row" style={{ marginTop: 5 }}>
              <div className="col-6">
                <p>Time spent</p>
                <input
                  type="number"
                  defaultValue="0"
                  min="0"
                  className="form-control"
                  name="timeTrackingSpent"
                  onChange={(e) => {
                    setTimetracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    setFieldValue("timeTrackingSpent", e.target.value);
                  }}
                />
              </div>

              <div className="col-6">
                <p>Time remaining</p>
                <input
                  type="number"
                  defaultValue="0"
                  min="0"
                  className="form-control"
                  name="timeTrackingRemaining"
                  onChange={(e) => {
                    setTimetracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                    setFieldValue("timeTrackingRemaining", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p>Description</p>

        <Editor
          name="description"
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
            setFieldValue("description", content);
          }}
        />
      </div>
    </form>
  );
}

const createTaskForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { arrayProject, taskTypeList, priorityList, statusList } = props;

    return {
      taskName: "",
      description: "",
      statusId: statusList[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: arrayProject[0]?.id,
      typeId: taskTypeList[0]?.id,
      priorityId: priorityList[0]?.priorityId,
      listUserAsign: [],
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: "CREATE_TASK_SAGA",
      task: values,
    });
  },
})(FormCreateTask);

const mapStateToProps = (state) => {
  return {
    arrayProject: state.ProjectCyberBugsReducers.arrayProject,
    taskTypeList: state.TaskTypeReducer.taskTypeList,
    priorityList: state.PriorityReducer.priorityList,
    statusList: state.StatusReducer.statusList,
  };
};

export default connect(mapStateToProps)(createTaskForm);
