import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function Login() {
  let [isBlocking, setIsBlocking] = useState(false);

  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserLogin({ ...userLogin, [name]: value });
  };
  const handleLogin = (event) => {
    event.preventDefault();
    if (userLogin.email === "cyberlean" && userLogin.password === "cyberlean") {
      //thành công chuyển về  trang trước đó
      navigate(-1);
      //chuyển đến trang home
      //   navigate("/home");

      //   navigate("/home", { replace: true });

      localStorage.setItem("userLogin", JSON.stringify(userLogin));
    } else {
      alert("Invalid Credentials");
      return;
    }
  };

  return (
    <form className="container" onSubmit={(e) => handleLogin(e)}>
      <Button type="primary" style={{ marginLeft: 8 }}>
        Primary Button
      </Button>
      <h3 className="text-center">LOGIN </h3>
      <div className="form-group">
        <label>Email </label>
        <input
          onChange={(e) => {
            handleChange(e);
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
            handleChange(e);
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
  );
}
