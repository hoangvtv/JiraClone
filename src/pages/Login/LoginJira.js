import React from "react";
import { Button, Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

export default function LoginJira() {
  return (
    <>
      <Layout>
        <Sider
          width={window.innerWidth / 2}
          style={{
            height: window.innerHeight,
            backgroundImage: "url(https://picsum.photos/500)",
          }}
        ></Sider>
        <Content>
          <form className="container">
            <h3 className="text-center">LOGIN </h3>
            <div className="form-group">
              <label>Email </label>
              <input
                onChange={(e) => {
                  //   handleChange(e);
                }}
                name="email"
                type="text"
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                onChange={(e) => {
                  //   handleChange(e);
                }}
                name="password"
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                {" "}
                Login{" "}
              </button>
            </div>
          </form>
        </Content>
      </Layout>
    </>
  );
}
