import React, { Fragment, useEffect } from "react";
// import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About.js/About";
import Header from "./components/Home/Header/Header";
import Login from "./pages/Login/Login";
import Detail from "./pages/Detail/Detail";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import TodoListRFC from "./pages/TodoList/TodoListRFC";
import TodoList from "./pages/TodoList/TodoList";
import TodoListRedux from "./pages/TodoList/TodoListRedux";
import BaiTapTodoListSaga from "./pages/BaiTapTodoListSaga/BaiTapTodoListSaga";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import DemoHOCModal from "./pages/DemoHOCModal/DemoHOCModal";
import Modal from "./HOC/Modal/Modal";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import LoginJira from "./pages/Login/LoginJira";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import { useDispatch } from "react-redux";
import CyberbugsTemplate from "./templates/HomeTemplate/CyberbugsTemplate";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";

import IndexCyberBugs from "./pages/CyberBugs/IndexCyberBugs";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import DrawerCyberBugs from "./HOC/CyberBugs/DrawerCyberBugs";
import DemoDragDrop from "./pages/DemoDragDrop/DemoDragDrop";
import DragAndDropDnD from "./pages/DragAndDropDnD/DragAndDropDnD";
import RegisterCyberBug from "./pages/CyberBugs/RegisterCyberBug/RegisterCyberBug";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "ADD_NAVIGATE", navigate: navigate });
  }, []);
  return (
    <Fragment>
      {/* <Header /> */}

      {/* <Modal /> */}
      <LoadingComponent />

      <Routes>
        <Route exact path="/" element={<ProjectManagement />} />
        <Route exact path="/home" element={<Home />} />
        {/* <HomeTemplate path="/home" exact Component={Home} /> */}

        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        {/* <Route exact path="/login" element={<Login />} /> */}
        <Route exact path="/login" element={<LoginCyberBugs />} />
        <Route exact path="/register" element={<RegisterCyberBug />} />
        <Route exact path="/cyberbugs" element={<IndexCyberBugs />} />
        <Route exact path="/createproject" element={<CreateProject />} />
        <Route
          exact
          path="/projectManagement"
          element={<ProjectManagement />}
        />

        <Route
          exact
          path="/projectDetail/:projectId"
          element={<IndexCyberBugs />}
        />

        <Route exact path="/detail/:id" element={<Detail />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/todolistRFC" element={<TodoListRFC />} />
        <Route exact path="/todolistRCC" element={<TodoList />} />
        <Route exact path="/todolistRedux" element={<TodoListRedux />} />
        <Route exact path="/todolistSaga" element={<BaiTapTodoListSaga />} />
        <Route exact path="/demoHOCModal" element={<DemoHOCModal />} />
        <Route exact path="/demoDragDrop" element={<DemoDragDrop />} />
        <Route exact path="/demoDragDropDND" element={<DragAndDropDnD />} />

        {/* khi url sai trả về PAGE 404 */}
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
      <DrawerCyberBugs />
    </Fragment>
  );
}

export default App;
