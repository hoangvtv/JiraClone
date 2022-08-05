import React from "react";
import { NavLink } from "react-router-dom";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TOKEN, USER_LOGIN } from "../../util/constants/system";

export default function MenuCyberbugs() {
  const { userLogin } = useSelector((state) => state.UserCyberBugsReducers);

  const handleLogout = () => {
    localStorage.removeItem(USER_LOGIN);
    localStorage.removeItem(TOKEN);
    window.location.reload();
  };

  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={require("../../assets/img/logo.png")} alt="download" />
        </div>
        <div className="account-info">
          <p>Jira Clone</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card" />{" "}
          <NavLink
            to="/cyberbugs"
            className="text-dark"
            activestyle={{ color: "blue" }}
            activeclassname="active font-weight-bold text-primary "
          >
            Jira Board
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog" />{" "}
          <NavLink
            to="/createproject"
            className="text-dark"
            activestyle={{ color: "blue" }}
            activeclassname="active font-weight-bold text-primary"
          >
            Create Project
          </NavLink>
        </div>

        <div>
          <i className="fa fa-cog" />{" "}
          <NavLink
            to="/projectManagement"
            className="text-dark"
            activestyle={{ color: "blue" }}
            activeclassname="active font-weight-bold text-primary"
          >
            Project Management
          </NavLink>
        </div>
      </div>
      <div className="feature">
        {!userLogin.email && (
          <div>
            {" "}
            <div>
              <i className="fa fa-truck" />
              <NavLink
                to="/login"
                className="text-dark"
                activestyle={{ color: "blue" }}
                activeclassname="active font-weight-bold text-primary"
              >
                Login
              </NavLink>
            </div>
            <div>
              <i className="fa fa-equals" />{" "}
              <NavLink
                to="/register"
                className="text-dark"
                activestyle={{ color: "blue" }}
                activeclassname="active font-weight-bold text-primary"
              >
                Register
              </NavLink>
            </div>
          </div>
        )}

        {userLogin.email && (
          <div>
            <div>
              <i className="fas fa-user"></i> {userLogin.name}
            </div>

            <div onClick={handleLogout}>
              <i className="fa fa-location-arrow" /> <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
