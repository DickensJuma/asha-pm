import Project from '../models/project';

interface ProjectData {
  name: string;
  description: string;
  taskd: string[];
 

}

class ProjectService {
  static async getAllProjects(): Promise<Project[]> {
    return Project.findAll();
  }

  static async createProject(projectData: any): Promise<Project> {
    return Project.create(projectData);
  }

  static async updateProject(projectId: number, projectData: ProjectData): Promise<Project | null> {
    const project = await Project.findByPk(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    return project.update(projectData);
  }

  static async deleteProject(projectId: number): Promise<Project | null> {
  const project:any= await Project.findByPk(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    return project.destroy();
  }

  static async getProjectById(projectId: number): Promise<Project | null> {
    const project = await Project.findByPk(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

}

export default ProjectService;
