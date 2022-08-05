import Axios from "axios";
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/system";

export const cyberBugService = {
  signinCyberBugs: (userLogin) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/users/signin`,
      method: "POST",
      data: userLogin,
    });
  },

  registerCyberBug: (userRegister) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}//Users/signup`,
      method: "POST",
      data: userRegister,
    });
  },
  getAllProjectCategory: () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/ProjectCategory`,
      method: "GET",
    });
  },

  createProjectCategory: (projectCategory) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/createProject`,
      method: "POST",
      data: projectCategory,
    });
  },

  createProjectCategoryAuthorize: (projectCategory) => {
    console.log("projectCategory", projectCategory);
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
      method: "POST",
      data: projectCategory,
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },

  getAllProject: () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/getAllProject`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },

  editProject: (projectEdit) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/updateProject?projectId=${projectEdit.id}`,
      method: "PUT",
      data: projectEdit,
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },

  deleteProject: (id) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/deleteProject?projectId=${id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },

  getProjectDetail: (projectId) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/getProjectDetail?id=${projectId}`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
};
