import React, { useState, useEffect } from "react";
import { Button, Layout, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";

import { registerCyberBugs } from "../../../redux/actions/CyberBugAction";
import { withFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

function RegisterCyberBugs(props) {
  const navigate = useNavigate();
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  const [{ width, height }, setSize] = useState({
    width: Math.round(window.innerWidth),
    height: Math.round(window.innerHeight),
  });

  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: Math.round(window.innerWidth),
        height: Math.round(window.innerHeight),
      });
    };
  }, []);
  return (
    <>
      <Layout>
        <Sider
          width={width / 2}
          style={{
            height: height,
            backgroundImage: `url(https://picsum.photos/${Math.round(
              width / 2
            )}/${height})`,
            backgroundSize: "100%",
          }}
        ></Sider>
        <Content>
          <form
            className="container"
            style={{ height: window.innerHeight }}
            onSubmit={handleSubmit}
          >
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ height: window.innerHeight }}
            >
              <h3
                className="text-center"
                style={{ fontWeight: 300, fontSize: 35 }}
              >
                REGISTER JIRA CLONE
              </h3>
              <div className="d-flex mt-3">
                <Input
                  style={{ width: "100%", minWidth: 300 }}
                  name="name"
                  size="large"
                  placeholder="Name"
                  prefix={<UserOutlined />}
                  onChange={handleChange}
                />
              </div>
              <div className="text-danger">{errors.name}</div>

              <div className="d-flex mt-3">
                <Input
                  style={{ width: "100%", minWidth: 300 }}
                  name="email"
                  size="large"
                  placeholder="Email"
                  prefix={<MailOutlined />}
                  onChange={handleChange}
                />
              </div>
              <div className="text-danger">{errors.email}</div>

              <div className="d-flex mt-3">
                <Input
                  style={{ width: "100%", minWidth: 300 }}
                  name="phone"
                  size="large"
                  placeholder="Phone"
                  prefix={<PhoneOutlined />}
                  onChange={handleChange}
                />
              </div>
              <div className="text-danger">{errors.phone}</div>

              {/* {errors.email && touched.email && <div>{errors.email}</div>} */}
              <div className="d-flex mt-3">
                <Input
                  style={{ width: "100%", minWidth: 300 }}
                  type="password"
                  name="password"
                  size="large"
                  placeholder="Password"
                  prefix={<LockOutlined />}
                  onChange={handleChange}
                />
              </div>
              <div className="text-danger">{errors.password}</div>
              <Button
                size="large"
                style={{
                  minWidth: 300,
                  backgroundColor: "rgb(102,117,223)",
                  color: "#fff",
                }}
                className="mt-5"
                htmlType="submit"
              >
                Register
              </Button>
              <div className="d-flex justify-content-center mt-3">
                <p>Already have an account? </p>
                <NavLink to="/login">Login</NavLink>
              </div>
            </div>
          </form>
        </Content>
      </Layout>
    </>
  );
}

const RegisterCyberBugsWithFormik = withFormik({
  mapPropsToValues: () => ({
    name: "",
    email: "",
    phone: "",
    password: "",
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email("Email is invalid!"),
    name: Yup.string()
      .required("Name is required!")
      .min(3, "Name is too short!")
      .max(20, "Name is too long!"),
    phone: Yup.string()
      .required("Phone is required!")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone is invalid!"
      ),
    password: Yup.string()
      .min(6, "Password must have min 6 characters")
      .max(20, "Password  have max 20 characters"),
  }),

  handleSubmit: (values, { props, ...setSubmitting }) => {
    const { name, email, phone, password } = values;
    props.dispatch(registerCyberBugs(name, email, phone, password));
  },
})(RegisterCyberBugs);

export default connect()(RegisterCyberBugsWithFormik);
