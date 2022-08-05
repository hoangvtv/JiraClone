import React from "react";
import { useDispatch } from "react-redux";
import SlideDown from "../../HOC/Modal/SlideDown";
import Login from "../Login/Login";
import Register from "../Register/Register";

export default function DemoHOCModal() {
  const LoginWithSlideDown = new SlideDown(Login); // gọi dưới dạng object
  const RegisterWithSlideDown = function () {
    return <Register />;
  }; //gọi dưới dạng thẻ

  const dispatch = useDispatch();
  return (
    <div>
      {/* Button trigger modal */}
      <button
        onClick={() => {
          dispatch({
            type: "OPEN_FORM",
            Component: <Login />,
          });
        }}
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
      >
        Đăng nhập
      </button>

      <button
        onClick={() => {
          dispatch({
            type: "OPEN_FORM",
            Component: <Register />,
          });
        }}
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
      >
        Đăng ký
      </button>

      {LoginWithSlideDown}
      <RegisterWithSlideDown />
    </div>
  );
}
