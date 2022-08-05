import React from "react";
// import parse from "html-react-parser";
const parse = require("html-react-parser");

export default function InfoMain(props) {
  const renderMember = () => {
    return props.projectDetail.members?.map((member, index) => {
      return (
        <div className="avatar" key={index}>
          <img src={member.avatar} alt={member.avatar} />
        </div>
      );
    });
  };

  return (
    <>
      <h3>{props.projectDetail.projectName}</h3>
      {/* <section> {parse(props.projectDetail.description)}</section> */}
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          {/* <div className="avatar">
            <img
              src={require("../../../assets/img/download (1).jfif")}
              alt="1"
            />
          </div>
          <div className="avatar">
            <img
              src={require("../../../assets/img/download (2).jfif")}
              alt="2"
            />
          </div>
          <div className="avatar">
            <img
              src={require("../../../assets/img/download (3).jfif")}
              alt="3"
            />
          </div> */}

          {renderMember()}
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
}
