import React, { Fragment } from "react";

import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs";
import ModalCyberBugs from "../../components/Cyberbugs/ModalCyberBugs.js/ModalCyberBugs";
import SidebarCyberbugs from "../../components/Cyberbugs/SidebarCyberbugs";

export default function CyberbugsTemplate() {
  return (
    <Fragment>
      <div className="jira">
        <SidebarCyberbugs />
        <MenuCyberbugs />
        {/* <Component {...propsRoute} /> */}
        <ModalCyberBugs />
      </div>
    </Fragment>
  );
}
