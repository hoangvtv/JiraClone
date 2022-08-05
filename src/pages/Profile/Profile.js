import React from "react";
import { Navigate } from "react-router-dom";

export default function Profile() {
  if (localStorage.getItem("userLogin")) {
    return <div>Profile</div>;
  } else {
    alert("vui lòng đăng nhập để vào trang này ");
    return <Navigate to="/login" />;
  }
}
