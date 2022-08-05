import React, { useState, useEffect } from "react";
import { Button, Layout, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { USER_SIGNIN_API } from "../../../redux/constants/CyberBugs/CyberBugsContants";
import { signInCyberBugsAction } from "../../../redux/actions/CyberBugAction";
import { withFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

function LoginCyberBugs(props) {
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
                LOGIN JIRA CLONE
              </h3>

              <div className="d-flex mt-3">
                <Input
                  style={{ width: "100%", minWidth: 300 }}
                  name="email"
                  size="large"
                  placeholder="Email"
                  prefix={<UserOutlined />}
                  onChange={handleChange}
                />
              </div>
              <div className="text-danger">{errors.email}</div>
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
                Login
              </Button>

              <div className="social mt-3 d-flex">
                <Button
                  style={{ backgroundColor: "rgb(59,89,152)" }}
                  shape="circle"
                  size={"large"}
                >
                  <span className="font-weight-bold" style={{ color: "#fff" }}>
                    F
                  </span>
                </Button>
                <Button
                  type="primary ml-3"
                  shape="circle"
                  icon={<TwitterOutlined />}
                  size={"large"}
                ></Button>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <p> Don't have an account? </p>
                <NavLink to="/register">Register</NavLink>
              </div>
            </div>
          </form>
        </Content>
      </Layout>
    </>
  );
}

const LoginCyberBugsWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email("Email is invalid!"),
    password: Yup.string()
      .min(6, "Password must have min 6 characters")
      .max(20, "Password  have max 20 characters"),
  }),

  handleSubmit: (values, { props, ...setSubmitting }) => {
    props.dispatch(signInCyberBugsAction(values.email, values.password));
  },
  displayName: "Login CyberBugs",
})(LoginCyberBugs);

export default connect()(LoginCyberBugsWithFormik);
