import React from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const param = useParams();
  console.log(param);
  return (
    <div>
      Giá trị tham số : {param.id}
      Path: {param.path}
    </div>
  );
}
