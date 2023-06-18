import Task from '../models/task';

interface TaskData {
  // Add any task data fields here
}

class TaskService {
  static async getAllTasks() {
    return Task.findAll();
  }

static async getTaskById(taskId: string) {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }


  static async createTask(taskData: any) {
    console.log(taskData);
    return Task.create(taskData);
  }

  static async updateTask(taskId: string, taskData: TaskData) {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    return task.update(taskData);
  }

  static async deleteTask(taskId: string) {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    return task.destroy();
  }

}

export default TaskService;
