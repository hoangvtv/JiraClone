import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const userLogin = useSelector(
    (state) => state.UserCyberBugsReducers.userLogin
  );
  console.log("userLogin", userLogin);
  return (
    <div>
      {userLogin?.name}
      <br />
      <img src={userLogin?.avatar} />
    </div>
  );
}
