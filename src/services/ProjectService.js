import { BaseService } from "./BaseService";

export class ProjectService extends BaseService {
  constructor() {
    super();
  }

  deleteProject(id) {
    return this.delete(`/Project/deleteProject?projectId=${id}`);
  }

  getProjectDetail(projectId) {
    return this.get(`/Project/getProjectDetail?projectId=${projectId}`);
  }
}

const projectService = new ProjectService();
export default projectService;
