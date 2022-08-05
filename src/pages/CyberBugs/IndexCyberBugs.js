import React from "react";
import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs";
import ModalCyberBugs from "../../components/Cyberbugs/ModalCyberBugs.js/ModalCyberBugs";
import SidebarCyberbugs from "../../components/Cyberbugs/SidebarCyberbugs";
import ContentMain from "../../components/Cyberbugs/Main/ContentMain";
import HeaderMain from "../../components/Cyberbugs/Main/HeaderMain";
import InfoMain from "../../components/Cyberbugs/Main/InfoMain";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function IndexCyberBugs() {
  let { projectDetail } = useSelector(
    (state) => state.ProjectCyberBugsReducers
  );
  let { projectId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_PROJECT_DETAIL_SAGA", projectId });
  }, []);

  return (
    <div>
      <div className="jira">
        <SidebarCyberbugs />
        <MenuCyberbugs />
        <div className="main">
          <HeaderMain projectDetail={projectDetail} />

          <InfoMain projectDetail={projectDetail} />

          <ContentMain projectDetail={projectDetail} />
        </div>

        <ModalCyberBugs />
      </div>
    </div>
  );
}
