import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";

import { connect, useDispatch, useSelector } from "react-redux";

function FormEditProject(props) {
  const dispatch = useDispatch();

  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducers.arrProjectCategory
  );

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  //componentdidmount
  useEffect(() => {
    dispatch({ type: "GET_ALL_PROJECT_CATEGORY_SAGA" });
    dispatch({ type: "SET_SUBMIT_EDIT_PROJECT", submitFunction: handleSubmit });
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  return (
    <form className="container-fuild" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project id</p>
            <input
              disabled
              className="form-control"
              name="id"
              value={values.id}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project name</p>
            <input
              value={values.projectName}
              className="form-control"
              name="projectName"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select
              name="categoryId"
              className="form-control"
              onChange={handleChange}
              value={values.categoryId}
            >
              {arrProjectCategory?.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              name="description123"
              // initialValue={values.description}
              value={values.description}
              init={{
                selector: "textarea#myTextArea",
                height: 500,

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
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

const editProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const projectEdit = props.projectEdit;
    return {
      id: projectEdit.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({ type: "EDIT_PROJECT_SAGA", projectEdit: values });
  },
})(FormEditProject);

const mapStateToProps = (state) => {
  return {
    projectEdit: state.ProjectCyberBugsReducers.projectEdit,
  };
};

export default connect(mapStateToProps)(editProjectForm);
