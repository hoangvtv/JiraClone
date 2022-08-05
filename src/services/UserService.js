// import { BaseService } from "./BaseService";

// export class UserService extends BaseService {
//   constructor() {
//     super();
//   }

//   getUser(keyword) {
//     return this.get(`/Users/getUser?keyword=${keyword}`);
//   }
// }

// const userService = new UserService();
// export default userService;
import Axios from "axios";
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/system";

export const userService = {
  getUser: (keyword) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Users/getUser?keyword=${keyword}`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },

  assignUserProject: (userProject) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/assignUserProject`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
      data: userProject,
    });
  },

  deleteUserFromProject: (projectDelete) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/removeUserFromProject`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
      data: projectDelete,
    });
  },

  getUserByProjectId: (projectId) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Users/getUserByProjectId?idProject=${projectId}`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
};

export default userService;
